//@flow

import QinCore from './core/QinCore';
import QinSandbox from './core/QinSandbox';

type QinPropsType = {
	height: number,
	width: number,
	element: HTMLElement,
	debugging?: boolean,
};

type SandboxInfoType = {
	name: string,
};

/**
 * a class for creating Qin instance
 */
class Qin {
	_core: QinCore;

	/**
	 * create Qin instance
	 * @param props {Object} QinPropsType
	 * @param props.debugging {boolean} turn on debugging
	 */
	constructor(props: QinPropsType) {
		this._core = new QinCore({ debugging: props?.debugging ?? false });
	}

	/**
	 * create/load sandbox from local or browser's indexDB
	 * @param sandboxInfo {Object} SandboxInfoType
	 * @param sandboxInfo.name {string} name of sandbox you want to create
	 * @returns {Promise<void>}
	 */
	async createSandbox(sandboxInfo: SandboxInfoType): Promise<void> {
		try {
			await this._core.desertify(sandboxInfo.name);
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * start sandbox engine, remember to call function createSandbox first
	 * @returns {Promise<void>}
	 */
	async start(): Promise<void> {
		try {
			await this._core.start();
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * stop sandbox engine
	 */
	stop(): void {
		try {
			this._core.stop();
		} catch (e) {
			console.error(e);
		}
	}
}

// export default Qin;
export { Qin, QinCore, QinSandbox };
