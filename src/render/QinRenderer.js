//@flow
import * as PIXI from 'pixi.js';
import type QinCore from '../core/QinCore';
import type QinScene from './QinScene';

type RendererPropsType = {
	core: QinCore;
	height: number;
	width: number;
	element: HTMLElement;
};

type NoneAnimationAssetType = {
	IS_CONTAIN_ANIMATION: boolean,
	DATA: {
		NAME: string,
		PATH: string,
	},
};

type AnimationAssetType = {
	IS_CONTAIN_ANIMATION: boolean,
	DATA: {
		[any]: {
			NAME: string,
			SPEED: number,
			PATH: string,
		},
	},
};

/**
 * class for renderer
 */
class QinRenderer {
	_core: QinCore;
	_canvasContainer: HTMLElement;
	_controller: null;
	_renderer: PIXI.Application;
	_resources: Object;
	_onAssetLoadingFinish: void => void;

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
		this._onAssetLoadingFinish = () => {
		};
		this._initRenderer(props);
		this._initAssetLoader();
	}

	/**
	 * init renderer and stage
	 * @param props {RendererPropsType}
	 * @private
	 */
	_initRenderer(props: RendererPropsType) {

		const {width, height} = props;

		this._renderer = new PIXI.Application(width, height, {backgroundColor: 0xeeeeee});

		// this._controller = new Controller({
		// 	mouse: new Mouse({
		// 		hitArea: new PIXI.Rectangle(0, 0, width, height),
		// 	}).init(),
		// });

		// this._stageAgent = new StageAgent({renderer: this._renderer, controller: this._controller});
		//
		// this._stageAgent.init();

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
		let loader:any = PIXI.loader;
		loader.onProgress.add((e) => {
			//console.log(e.progress);
		});

		loader.onComplete.add((loader, resources) => {
			this._resources = resources;
			this._onAssetLoadingFinish();
		});
	}

	_setAssetLoadingListener(onFinish: void => void) {
		this._onAssetLoadingFinish = onFinish;
	}

	/**
	 * loading asset files to memory
	 * @param assetsSet {object} static object contain files information such as path, name etc.
	 * @private
	 */
	_prepareAssets(assetsSet: Array<NoneAnimationAssetType | AnimationAssetType>) {
		let loader = PIXI.loader;
		loader.reset();

		for (let assetsData of assetsSet) {

			for (const asset in assetsData) {
				if (assetsData[asset].IS_CONTAIN_ANIMATION) {
					for (let animation in assetsData[asset].DATA) {
						loader.add(assetsData[asset].DATA[animation].NAME, assetsData[asset].DATA[animation].PATH);
					}
				}
				else {
					loader.add(assetsData[asset].DATA.NAME, assetsData[asset].DATA.PATH);
				}
			}
		}

		loader.load();
	}

	renderScene(scene: QinScene){
		scene._setRenderer(this);
		// this._setAssetLoadingListener(scene.onAssetsFinish());
		// this._prepareAssets(scene.getAssetsDate());
		return this;
	}

	render() {}
}

export default QinRenderer;
