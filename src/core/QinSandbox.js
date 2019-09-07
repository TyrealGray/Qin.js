//@flow

import { initStore } from './reduxCore/storeUtil';
import {
	storeInit,
	storeConnectReactor,
} from './reduxCore/actions/storeActions';

import Reactor from './reactorCore/Reactor';

type QinSandBoxPropsType = {
	isDebugRedux?: boolean,
};

class QinSandbox {
	_store: ReduxStore;
	_reactor: Reactor;
	_isDebugRedux: boolean;

	constructor(props: QinSandBoxPropsType) {
		this._isDebugRedux = props.isDebugRedux || false;
	}

	async init(name: string): Promise<void> {
		try {
			this._initRedux(this._isDebugRedux);
			await this._initReactor(name);
		} catch (e) {
			console.error(e);
		}
	}

	_initRedux(isDebugRedux: boolean): void {
		this._store = initStore(isDebugRedux);
		this._store.dispatch(storeInit());
	}

	async _initReactor(name: string): Promise<void> {
		this._reactor = new Reactor({ name: name });
		await this._reactor.init();
		await this._store.dispatch(
			storeConnectReactor(await this._reactor.getData()),
		);
	}

	loadExtra(extra: Object) {
		this._reactor.loadExtra(extra);
	}
}

export default QinSandbox;
