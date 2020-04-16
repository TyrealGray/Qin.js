declare module 'nedb' {
	declare export default any;
}

declare module 'ulid' {
	declare export default any;
	declare export var monotonicFactory: any;
}

declare module 'Perlin.js' {
	declare export default any;
	declare export var simplex2: any;
}

declare module 'analysis.js' {
	declare export var Analysis: AnalysisJS;
}

declare module 'shuoRule.json' {
	declare export default {[any]:any};
}

declare type AnalysisJS = {
	getPerformance: (...args:any) => Performance;
};

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
