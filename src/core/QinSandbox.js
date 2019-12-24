//@flow

import Reactor from './reactorCore/Reactor';

type QinSandBoxPropsType = {
	debugging?: boolean,
};

class QinSandbox {
	_reactor: Reactor;
	_debugging: boolean;

	constructor(props: QinSandBoxPropsType) {
		this._debugging = props.debugging || false;
	}

	async init(name: string): Promise<void> {
		try {
			await this._initReactor(name);
		} catch (e) {
			console.error(e);
		}
	}

	async start(): Promise<void> {
		try {
			await this._reactor.start();
		} catch (e) {
			console.error(e);
		}
	}

	stop(): void {
		try {
			this._reactor.stop();
		} catch (e) {
			console.error(e);
		}
	}

	async _initReactor(name: string): Promise<void> {
		this._reactor = new Reactor({ name: name, debugging: this._debugging });
		await this._reactor.init();
	}

	loadExtra(extra: Object) {
		this._reactor.loadExtra(extra);
	}
}

export default QinSandbox;
