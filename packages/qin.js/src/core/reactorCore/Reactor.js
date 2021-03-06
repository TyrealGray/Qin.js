//@flow
import { version } from '../../../package.json';
import { Analysis } from 'analysis.js';

import Shuo from './shuoCore/Shuo';
import DBClient from './dbCore/DBClient';
import { initStore } from './reduxCore/storeUtil';
import {
	storeConnectReactor,
	storeInit,
} from './reduxCore/actions/storeActions';
import { checkConditions } from './conditionCheck';
import { REACTOR_START, RECORD_EVENT_TIME } from './reduxCore/actions/actionTypes';
import { checkChanceByTicker } from './processReaction';

const QINJS_Version = { system: 'QINJS_Version' };
const REACTOR_CONTENT = { system: 'REACTOR_CONTENT' };
const SHUO_RULE = { system: 'SHUO_RULE' };

type ReactorPropsType = {
	name: string,
	debugging: boolean,
};

/**
 * a class for reacting all events with shou rules when they trigger in update function
 */
class Reactor {
	_name: string;
	_debugging: boolean;
	_shuo: Shuo;
	_store: ReduxStore;
	_dbCore: DBClient;
	_timerId: TimeoutID;
	_storeData: Object;
	_eventTriggerLimitQueue: Object;
	_performanceTicker: Performance;

	/**
	 * class Reactor constructor function
	 * @param props {Object} ReactorPropsType
	 * @param props.name {string} name of the reactor
	 * @param props.debugging {boolean} set to be debugging mode when it's true
	 */
	constructor(props: ReactorPropsType) {
		this._shuo = new Shuo();
		this._name = props.name;
		this._eventTriggerLimitQueue = {};
		this._debugging = props.debugging;
		this._performanceTicker = Analysis.getPerformance();
	}

	async _init(): Promise<void> {
		try {
			this._initShuo();
			this._initDB();
			this._initRedux();

			if (!(await this._isSameVersion())) {
				if (this._debugging) {
					console.log(
						'Core version is not the same, init new reactor',
					);
				}
				await this._initReactorChain();
			}

			await this._initReactorContent();

			// if (!(await this._hasContent())) {
			// 	if (this._debugging) {
			// 		console.log(
			// 			'No reactor content found, init reactor content',
			// 		);
			// 	}
			// 	await this._initReactorContent();
			// }
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * synchronize redux data to DB
	 */
	syncStoreToDBCore(): void {
		this._store.subscribe(() => {
			this._storeData = this._store.getState();
		});
	}

	async _update(delta: number, tick: number): Promise<void> {
		const { terrainInfo, npcInfo, gameInfo, eventTimeInfo } = this._storeData;

		const rules = await this.getRules();

		[terrainInfo, npcInfo].forEach(async (statusInfo) => {
			for (const data of statusInfo.dataSet) {
				const eventQueue = [];
				for (const rule of rules) {
					if (data.type === rule.attribute.type) {
						for (const trigger of rule.eventTriggers) {
							if (
								trigger.triggerLimit &&
								!eventTimeInfo.dataSet[trigger.name]
							) {
								await this._store.dispatch({
									type: RECORD_EVENT_TIME,
									name: trigger.name,
									time: 0,
									cycle: trigger.triggerLimit,
								});
							}

							if (
								eventTimeInfo.dataSet[trigger.name] &&
								tick <
								eventTimeInfo.dataSet[trigger.name].time
							) {
								continue;
							}


							if (trigger.triggerLimit) {
								await this._store.dispatch({
									type: RECORD_EVENT_TIME,
									name: trigger.name,
									time: tick + trigger.triggerLimit,
									cycle: trigger.triggerLimit,
								});
							}

							if(trigger.rate && !checkChanceByTicker({seed: gameInfo.seed, time: tick}, trigger.rate)){
								continue;
							}

							const conditionInfo = checkConditions(
								data,
								trigger.conditions,
							);

							if (!conditionInfo) {
								continue;
							}

							const dispatchData = {
								type: trigger.name,
								triggerBy: data,
								stamp: { time: tick, seed: gameInfo.seed },
								conditionInfo,
							};

							eventQueue.push(dispatchData);
						}
					}
				}

				//TODO: check rules priority & discardOthers bool to discard same type trigger
				eventQueue.forEach(async (event) => {
					await this._store.dispatch(event);
				});

			}
		});

		this._timerId = setTimeout(async () => {
			await this._update(
				this._performanceTicker.now() - tick,
				this._performanceTicker.now(),
			);
		}, 50);


	}

	/**
	 * start reactor update
	 * @returns {Promise<void>}
	 */
	async start(): Promise<void> {
		try {
			this._storeData = await this.getData();
			await this._store.dispatch(storeConnectReactor(this._storeData));

			this.syncStoreToDBCore();

			await this._store.dispatch({type: REACTOR_START});

			this._timerId = setTimeout(async () => {
				await this._update(0, 0);
			}, 50);

			setTimeout(async () => {
				await this._dbCore.update(REACTOR_CONTENT, {
					...REACTOR_CONTENT,
					value: this._storeData,
				});
			}, 5000);
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * stop reactor
	 */
	stop(): void {
		try {
			clearTimeout(this._timerId);
		} catch (e) {
			console.error(e);
		}
	}

	_initRedux(): void {
		this._store = initStore(this._debugging);
		this._store.dispatch(storeInit());
	}

	/**
	 * return all the redux data in reactor content
	 * @returns {Promise<Object>}
	 */
	async getData(): Promise<Object> {
		const data = await this._dbCore.queryOne(REACTOR_CONTENT);
		return data.value;
	}

	/**
	 * get all the shou rules
	 * @returns {Promise<Object>}
	 */
	async getRules(): Promise<Object> {
		const rules = await this._dbCore.queryOne(SHUO_RULE);
		return rules.value;
	}

	async _initReactorChain(): Promise<void> {
		await this._dbCore.update(QINJS_Version, {
			...QINJS_Version,
			value: 0,
		});
		await this._dbCore.update(SHUO_RULE, {
			...SHUO_RULE,
			value: this._shuo.getRule(),
		});
	}

	async _initReactorContent(): Promise<void> {
		await this._dbCore.update(REACTOR_CONTENT, {
			...REACTOR_CONTENT,
			value: this._shuo.getContent(),
		});
	}

	_initShuo(): void {
		this._shuo.init();
	}

	_initDB(): void {
		this._dbCore = new DBClient({ name: `QINJS_${this._name}_DB` });
	}

	async _isSameVersion(): Promise<boolean> {
		try {
			const versionDoc = await this._dbCore.queryOne(QINJS_Version);
			if (versionDoc) {
				return versionDoc.value === version;
			}

			return false;
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	async _hasContent(): Promise<boolean> {
		try {
			const hasContent = await this._dbCore.query(REACTOR_CONTENT);
			return !!hasContent.length;
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	/**
	 * load extra shou rules
	 * @param extra {Object}
	 */
	loadExtra(extra: Object) {
		this._shuo.loadExtra(extra);
	}
}

export default Reactor;
