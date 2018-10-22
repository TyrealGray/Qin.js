//@flow

import { initStore } from './reduxCore/storeUtil';
import { storeInit } from './reduxCore/actions/storeActions';

import Shuo from './shuoCore/Shuo';
import DBClient from './dbCore/DBClient';

type QinSandBoxPropsType = {
	isDebugRedux?: boolean;
};

class QinSandbox {
	_shuo: Shuo;
	_store: ReduxStore;
	_dbCore: DBClient;
	_isDebugRedux: boolean;

	constructor(props: QinSandBoxPropsType) {
		this._isDebugRedux = props.isDebugRedux || false;
		this._shuo = new Shuo();
	}

	async init(name: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			try {
				this._initRedux(this._isDebugRedux);
				await this._initShuo();
				await this._initPouchDB(name);
				resolve();
			} catch (e) {
				reject(e);
			}
		});
	}

	_initRedux(isDebugRedux: boolean): void {
		this._store = initStore(isDebugRedux);
		this._store.subscribe(() => console.log(this._store.getState()));

		this._store.dispatch(storeInit());
	}

	async _initShuo(): Promise<void> {
		await this._shuo.init();
	}

	async _initPouchDB(name: string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this._dbCore = new DBClient({name});
				resolve();
			} catch (e) {
				reject(e);
			}
		});
	}

	loadExtra(extra: Object | null) {
		if (extra) {
			this._shuo.loadExtra(extra);
		}
	}
}

export default QinSandbox;