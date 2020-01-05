//@flow
import { version } from '../../../package.json';

import Shuo from './shuoCore/Shuo';
import DBClient from './dbCore/DBClient';
import { initStore } from './reduxCore/storeUtil';
import {
	storeConnectReactor,
	storeInit,
} from './reduxCore/actions/storeActions';

const QINJS_Version = { system: 'QINJS_Version' };
const REACTOR_CONTENT = { system: 'REACTOR_CONTENT' };
const SHUO_RULE = { system: 'SHUO_RULE' };

type ReactorPropsType = {
	name: string,
	debugging?: boolean,
};

class Reactor {
	_name: string;
	_debugging: boolean;
	_shuo: Shuo;
	_store: ReduxStore;
	_dbCore: DBClient;
	_timerId: TimeoutID;
	_storeData: Object;
	_eventTimeoutQueue: Object;
	_performanceTicker: PerfHooks | Performance;

	constructor(props: ReactorPropsType) {
		this._shuo = new Shuo();
		this._name = props.name;
		this._eventTimeoutQueue = {};
		this._debugging = props.debugging || false;
		this._performanceTicker =
			typeof performance !== 'undefined'
				? performance
				: require('perf_hooks').performance;
	}

	async init(): Promise<void> {
		try {
			this._initShuo();
			this._initDB();
			this._initRedux(this._debugging);

			if (!(await this._isSameVersion())) {
				console.log('Core version is not the same, init new reactor');
				await this._initReactorChain();
			}

			if (!(await this._hasContent())) {
				console.log('No reactor content found, init reactor content');
				await this._initReactorContent();
			}
		} catch (e) {
			console.error(e);
		}
	}

	syncStoreToDBCore(): void {
		this._store.subscribe(() => {
			this._storeData = this._store.getState();
		});
	}

	static checkCondition(status: Object, conditions: Object): boolean {
		for (const condition in conditions) {
			switch (condition) {
				case 'moreThan':
					for (const moreThanProps of conditions['moreThan']) {
						let matched = 0;
						for (const prop in moreThanProps) {
							if (moreThanProps[prop] < status[prop]) {
								matched++;
							}

							if (
								matched === Object.entries(moreThanProps).length
							) {
								return true;
							}
						}
					}
			}
		}

		return false;
	}

	async update(delta: number, tick: number): Promise<void> {
		// console.log(delta);
		const { terrainInfo } = this._storeData;

		const rules = await this.getRules();

		[terrainInfo].forEach(async (statusInfo) => {
			for (const data of statusInfo.dataSet) {
				for (const rule of rules) {
					if (data.type === rule.attribute.type) {
						for (const trigger of rule.eventTriggers) {
							if (
								Reactor.checkCondition(data, trigger.condition)
							) {
								const dispatchData = {
									type: trigger.name,
									playload: { triggerBy: data },
								};
								const rate = Math.random();
								if (rate > trigger.rate) {
									if (
										trigger.timeOut &&
										!this._eventTimeoutQueue[trigger.name]
									) {
										this._eventTimeoutQueue[
											trigger.name
										] = 0;
									}

									if (
										this._eventTimeoutQueue[
											trigger.name
										] !== undefined &&
										tick >
											this._eventTimeoutQueue[
												trigger.name
											]
									) {
										this._eventTimeoutQueue[trigger.name] =
											tick + trigger.timeOut;
										await this._store.dispatch(dispatchData);
									} else if (!trigger.timeOut) {
										await this._store.dispatch(dispatchData);
									}
								}
							}
						}
					}
				}
			}
		});

		this._timerId = setTimeout(async () => {
			await this.update(
				this._performanceTicker.now() - tick,
				this._performanceTicker.now(),
			);
		}, 50);
	}

	async start(): Promise<void> {
		try {
			this._storeData = await this.getData();
			this.syncStoreToDBCore();

			this._timerId = setTimeout(async () => {
				await this.update(0, 0);
			}, 50);

			await this._store.dispatch(storeConnectReactor(this._storeData));
		} catch (e) {
			console.error(e);
		}
	}

	stop(): void {
		try {
			clearTimeout(this._timerId);
		} catch (e) {
			console.error(e);
		}
	}

	_initRedux(debugging: boolean): void {
		this._store = initStore(debugging);
		this._store.dispatch(storeInit());
	}

	async getData(): Promise<Object> {
		const data = await this._dbCore.queryOne(REACTOR_CONTENT);
		return data.value;
	}

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

	loadExtra(extra: Object) {
		this._shuo.loadExtra(extra);
	}
}

export default Reactor;
