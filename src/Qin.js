//@flow

import QinCore from './core/QinCore';
import QinSandbox from './core/QinSandbox';

type QinPropsType = {
	height: number,
	width: number,
	element: HTMLElement,
	isDebugRedux: boolean,
};

/**
 * class for creating Qin instance
 */
class Qin {
	_core: QinCore;

	/**
	 * create Qin instance
	 * @param props {Object} QinPropsType
	 * @param props.element {HTMLElement} html element to let Qin knows where to add canvas
	 * @param props.isDebugRedux {boolean} turn on debugging for redux store
	 */
	constructor(props: QinPropsType) {
		this._core = new QinCore({ isDebugRedux: props.isDebugRedux });
	}

	async createSandbox(sandboxInfo: { name: string }): Promise<void> {
		return new Promise(async (resolve, reject) => {
			try {
				await this._core.desertify(sandboxInfo.name);
				resolve();
			} catch (e) {
				reject(e);
			}
		});
	}

	run(): number {
		console.log('Qin is running!');
		return 0;
	}
}

// export default Qin;
export { Qin, QinCore, QinSandbox };
