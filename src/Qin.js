//@flow

import QinCore from './core/QinCore';
import QinSandBox from './core/QinSandBox';

import QinRenderer from './render/QinRenderer';
import QinScene from './render/QinScene';

import PouchDB from 'pouchdb';

import { initStore } from './core/reduxCore/storeUtil';
import { storeInit } from './core/reduxCore/actions/storeActions';

type QinPropsType = {
	canvas: HTMLCanvasElement,
	debugRedux: boolean,
};

/**
 * class for creating Qin instance
 */
class Qin {
	_renderer: QinRenderer;
	_store: ReduxStore;

	/**
	 * create Qin instance
	 * @param props {Object} QinPropsType
	 * @param props.canvas {HTMLCanvasElement} canvas element to let Qin knows where to render
	 * @param props.debugRedux {boolean} start debug mode in redux, use remoteredux-standalone listens to port 9009
	 */
	constructor(props: QinPropsType) {
		this._renderer = new QinRenderer({ canvasElement: props.canvas });

		this._initRedux(props.debugRedux);

		this._createNewWorld();
	}

	loadSandBox() {}

	loadScene() {}

	_createNewWorld() {
		const db = new PouchDB('qindb');

		db.get('ityrealGray@gmail.com')
			.then((doc) => {
				console.log('doc', doc);
			})
			.catch((e) => {
				console.error(e);
			});
		//
		// db.changes().on('change', function() {
		//     console.log('Changes');
		// });
		//
		//db.replicate.to('qin');
	}

	_initRedux(debugRedux: boolean) {
		this._store = initStore(debugRedux);
		this._store.subscribe(() => console.log(this._store.getState()));

		this._store.dispatch(storeInit());
	}

	render() {}
}

export default Qin;
export { QinCore, QinSandBox, QinRenderer, QinScene };
