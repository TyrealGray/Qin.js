//@flow

import Reactor from './reactorCore/Reactor';

type QinSandBoxPropsType = {
	debugging?: boolean,
};

/**
 * a class for handle process rules and data qin.js engine
 */
class QinSandbox {
	_reactor: Reactor;
	_debugging: boolean;

	/**
	 * create QinSandbox instance
	 * @param props {Object} QinSandBoxPropsType
	 * @param props.debugging {boolean} set sandbox running as debug mode if it's true
	 */
	constructor(props: QinSandBoxPropsType) {
		this._debugging = props?.debugging ?? false;
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
		await this._reactor._init();
	}

	/**
	 * loading extra rule in sandbox
	 * @param extra {Object} shuo rules json object
	 */
	loadExtra(extra: Object) {
		this._reactor.loadExtra(extra);
	}
}

export default QinSandbox;
