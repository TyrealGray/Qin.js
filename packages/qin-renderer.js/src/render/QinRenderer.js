//@flow
import * as PIXI from 'pixi.js';
import type QinScene from './QinScene';
import type { AnimationAssetType } from '../static/Animation';

type RendererPropsType = {
	core: any,
	height: number,
	width: number,
	element: HTMLElement,
};

/**
 * class for renderer
 */
class QinRenderer {
	_core: any;
	_canvasContainer: HTMLElement;
	_controller: null;
	_renderer: PIXI.Application;
	_resources: Object;
	_onAssetLoadingFinish: (void) => void;

	/**
	 * init renderer for engine
	 * @param props {RendererPropsType}
	 * @param props._core {QinCore} engine core
	 * @param props._canvas {HTMLElement} HTMLElement instance which will contain your renderer
	 */
	constructor(props: RendererPropsType) {
		this._core = props.core;
		this._canvasContainer = props.element;
		this._controller = null;
		this._onAssetLoadingFinish = () => {};
		this._initRenderer(props);
		this._initAssetLoader();
	}

	/**
	 * init renderer and stage
	 * @param props {RendererPropsType}
	 * @private
	 */
	_initRenderer(props: RendererPropsType) {
		const { width, height } = props;

		this._renderer = new PIXI.Application({
			width,
			height,
			backgroundColor: 0xeeeeee,
		});

		this._canvasContainer.appendChild(this._renderer.view);

		this._renderer.view.addEventListener('contextmenu', (e) => {
			e.preventDefault();
		});
	}

	/**
	 * init asset loader for loading asset files
	 * @todo show progress information
	 * @private
	 */
	_initAssetLoader() {
		let loader: any = PIXI.Loader.shared;
		loader.onProgress.add((e) => {
			//console.log(e.progress);
		});

		loader.onComplete.add((loader, resources) => {
			this._resources = resources;
			this._onAssetLoadingFinish();
		});
	}

	_setAssetLoadingListener(onFinish: (void) => void) {
		this._onAssetLoadingFinish = onFinish;
	}

	/**
	 * loading asset files to memory
	 * @param assetsSet {object} static object contain files information such as path, name etc.
	 * @private
	 */
	_prepareAssets(assetsSet: Array<AnimationAssetType>) {
		let loader = PIXI.Loader.shared;
		loader.reset();

		for (let assetsData of assetsSet) {
			for (const asset of assetsData) {
				for (const animation of asset.DATA) {
					loader.add(animation.NAME, animation.PATH);
				}
			}
		}

		loader.load();
	}

	addActor(actor: any) {
		this._renderer.stage.addChild(actor);
	}

	renderScene(scene: QinScene) {
		scene._setRenderer(this);
		scene.onFinish();
		// this._setAssetLoadingListener(scene.onAssetsFinish());
		// this._prepareAssets(scene.getAssetsDate());
		return this;
	}

	render() {}
}

export default QinRenderer;
