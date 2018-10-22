//@flow

import QinCore from './core/QinCore';
import QinSandbox from './core/QinSandbox';

import QinRenderer from './render/QinRenderer';
import QinScene from './render/QinScene';

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
	_renderer: QinRenderer;

	/**
	 * create Qin instance
	 * @param props {Object} QinPropsType
	 * @param props.element {HTMLElement} html element to let Qin knows where to add canvas
	 * @param props.isDebugRedux {boolean} turn on debugging for redux store
	 */
	constructor(props: QinPropsType) {
		this._core = new QinCore({ isDebugRedux: props.isDebugRedux });
		this._renderer = new QinRenderer({
			core: this._core,
			element: props.element,
			width: props.width,
			height: props.height,
		});
	}

	loadSandBox(sandBox: QinSandbox) {
		this._core.setSandBox(sandBox);
	}

	loadScene(scene: QinScene) {}

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

	run(): void {
		console.log('Qin is running!');
	}

	render() {}
}

export default Qin;
export { QinCore, QinSandbox, QinRenderer, QinScene };
