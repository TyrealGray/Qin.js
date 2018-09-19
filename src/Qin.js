//@flow
import Renderer from './render/renderer';
import PouchDB from 'pouchdb';

type QinPropsType = {
	canvas: HTMLCanvasElement,
};

class Qin {
	_renderer: Renderer;

	constructor(props: QinPropsType) {
		this._renderer = new Renderer({canvasElement: props.canvas});

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

	render() {
	}
}

export default Qin;
