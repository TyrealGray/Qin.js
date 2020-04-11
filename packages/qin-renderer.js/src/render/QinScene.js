//@flow
import * as PIXI from 'pixi.js';
import type QinRenderer from './QinRenderer';
import { getRenderAssets } from '../util/envUtil';

class QinScene {
	_renderer: QinRenderer;

	constructor(props: any) {
		//this._renderer = null;
	}

	_setRenderer(renderer: QinRenderer) {
		this._renderer = renderer;
	}

	onFinish() {
		let loader = PIXI.Loader.shared;
		loader.reset();

		loader.add('test', getRenderAssets('./LOMS.png'));

		loader.load((loader, resources) => {

			const bunny: any = new PIXI.Sprite(resources.test.texture);
			this._renderer.addActor(bunny);

			let rotation = 0;
			setInterval(()=>{
				rotation += 0.005;
				Math.cos(rotation);
				bunny.rotation = 0.5 * Math.cos(rotation);
			},1000);

			loader.reset();

		});
	}
}

export default QinScene;
