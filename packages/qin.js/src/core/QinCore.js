//@flow

import QinSandbox from './QinSandbox';

type QinCorePropsType = {
	debugging?: boolean;
}

/**
 * a class handle all the core function of the qin.js
 */
class QinCore {

	_sandbox: QinSandbox;

	/**
	 * create a qin.js engine core instance
	 * @param props {Object} QinCorePropsType
	 * @param props.debugging {boolean} set core running as debug mode if it's true
	 */
	constructor(props: QinCorePropsType) {
		this._sandbox = new QinSandbox({debugging: props.debugging});
	}

	/**
	 * set an existing sandbox instance to handle by core
	 * @param sandbox {QinSandbox}
	 */
	setSandBox(sandbox: QinSandbox): void {
		this._sandbox = sandbox;
	}

	/**
	 * create/load sandbox by name from local or browser's indexDB
	 * @param name {string} name of the sandbox
	 * @returns {Promise<void>}
	 */
	async desertify(name: string): Promise<void> {
		await this._sandbox.init(name);
	}

	/**
	 * start sandbox
	 * @returns {Promise<void>}
	 */
	async start(): Promise<void> {
		await this._sandbox.start();
	}

	/**
	 * stop sandbox
	 */
	stop(): void {
		this._sandbox.stop();
	}
}

export default QinCore;