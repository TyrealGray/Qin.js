//@flow
import { version } from '../../../package.json';

import Shuo from './shuoCore/Shuo';
import DBClient from './dbCore/DBClient';
import { initStore } from './reduxCore/storeUtil';
import { storeConnectReactor, storeInit } from './reduxCore/actions/storeActions';

const QINJS_Version = 'QINJS_Version';
const REACTOR_CONTENT = 'REACTOR_CONTENT';

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

	constructor(props: ReactorPropsType) {
		this._name = props.name;
		this._debugging = props.debugging || false;
		this._shuo = new Shuo();
	}

	async init(): Promise<void> {
		try {
			await this._initShuo();
			this._initPouchDB();
			this._initRedux(this._debugging);

			if (!(await this._isSameVersion())) {
				await this._initReactorChain();
			}

			if(!(await this._hasContent())){
				await this._initReactorContent();
			}

			await this._store.dispatch(
				storeConnectReactor(await this.getData()),
			);
		} catch (e) {
			console.error(e);
		}
	}

	_initRedux(debugging: boolean): void {
		this._store = initStore(debugging);
		this._store.dispatch(storeInit());
	}

	async getData(): Promise<Object> {
		return { content: await this._dbCore.query('content') };
	}

	async _initReactorChain(): Promise<void> {
		await this._dbCore.update(QINJS_Version, { number: 0 });
		await this._dbCore.update('rule', this._shuo.getRule());
	}

	async _initReactorContent(): Promise<void> {
		await this._dbCore.update('content', this._shuo.getContent());
	}

	async _initShuo(): Promise<void> {
		await this._shuo.init();
	}

	_initPouchDB(): void {
		this._dbCore = new DBClient({ name: `QINJS_${this._name}_DB` });
	}

	async _isSameVersion(): Promise<boolean> {
		try {
			const versionDoc = await this._dbCore.query(QINJS_Version);
			if (versionDoc) {
				return versionDoc.number === version;
			}

			return false;
		} catch (e) {
			console.error(e);
		}
	}

	async _hasContent(): Promise<boolean> {
		try {
			const hasContent = await this._dbCore.query(REACTOR_CONTENT);
			return !!hasContent;
		} catch (e) {
			console.error(e);
		}
	}

	loadExtra(extra: Object) {
		this._shuo.loadExtra(extra);
	}
}

export default Reactor;
