//@flow

import QinCore from './core/QinCore';
import QinSandbox from './core/QinSandbox';

type QinPropsType = {
	height: number,
	width: number,
	element: HTMLElement,
	debugging: boolean,
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
	 * @param props.debugging {boolean} turn on debugging
	 */
	constructor(props: QinPropsType) {
		this._core = new QinCore({ debugging: props.debugging });
	}

	async createSandbox(sandboxInfo: { name: string }): Promise<void> {
		try {
			return await this._core.desertify(sandboxInfo.name);
		} catch (e) {
			console.error(e);
		}
	}

	run(): number {
		console.log('Qin is running!');
		return 0;
	}
}

// export default Qin;
export { Qin, QinCore, QinSandbox };
