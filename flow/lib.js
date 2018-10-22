declare module 'pouchdb' {
	declare export default any;
}

declare module 'shuoRule.json' {
	declare export default {[any]:any};
}

declare module 'pixi.js' {
	declare export function Application(...args:any): {view: HTMLCanvasElement};
	declare export var loader: {
		onProgress: any => any;
		reset: void => void;
		add: (string,string) => void;
		load: void => void;
	}
}

declare type ReduxStore = {
	dispatch: function;
	getState: function;
	subscribe: function;
	unsubscribe: function;
};

declare module 'redux' {
	declare export function createStore(...args:any): any;

	declare export function combineReducers(...args:any): any;
}

declare module 'remote-redux-devtools' {
	declare export default any;
}
