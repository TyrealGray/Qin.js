//@flow
import Renderer from './render/renderer';
import PouchDB from 'pouchdb';
import { initStore } from './reduxCore/storeUtil';
import { storeInit } from './reduxCore/actions/storeActions';

type QinPropsType = {
	canvas: HTMLCanvasElement;
	debugRedux: boolean;
};

class Qin {
	_renderer: Renderer;
	_store: ReduxStore;

	constructor(props: QinPropsType) {
		this._renderer = new Renderer({canvasElement: props.canvas});

		this._initRedux(props.debugRedux);

		this._createNewWorld();
	}

	_createNewWorld() {
		const db = new PouchDB('qindb');
		//
		// db.get('dave@gmail.com').then(function (doc) {
		//     console.log(doc);
		// });
		//
		// db.changes().on('change', function() {
		//     console.log('Changes');
		// });
		//
		//db.replicate.to('qin');
	}

	_initRedux(debugRedux){
		this._store = initStore(debugRedux);
		this._store.subscribe(() =>
			console.log(this._store.getState())
		);

		this._store.dispatch(storeInit());
	}

	render() {
	}
}

export default Qin;
