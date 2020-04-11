declare module 'pixi.js' {
	declare export function Application(...args:any): {view: HTMLCanvasElement};
	declare export function Sprite(...args:any): any;
	declare export var loader: {
		onProgress: any => any;
		reset: void => void;
		add: (...args:any) => void;
		load: (...args:any) => void;
	}
	declare export var stage: {
		add: (...args:any) => void;
	}

}