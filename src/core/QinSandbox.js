//@flow

import { initStore } from './reduxCore/storeUtil';
import { storeInit } from './reduxCore/actions/storeActions';

import Reactor from './reactorCore/Reactor';

type QinSandBoxPropsType = {
	isDebugRedux?: boolean;
};

class QinSandbox {
	_store: ReduxStore;
	_reactor: Reactor;
	_isDebugRedux: boolean;

	constructor(props: QinSandBoxPropsType) {
		this._isDebugRedux = props.isDebugRedux || false;
	}

	async init(name: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			try {
				this._initRedux(this._isDebugRedux);
				this._initReactor(name);
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

	async _initReactor(name: string): Promise<void> {
		this._reactor = new Reactor({ name: name });
		await this._reactor.init();
	}

	loadExtra(extra: Object) {
		this._reactor.loadExtra(extra);
	}
}

export default QinSandbox;