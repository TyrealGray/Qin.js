declare module 'nedb' {
	declare export default any;
}

declare module 'ulid' {
	declare export default any;
	declare export var monotonicFactory: any;
}

declare module 'perf_hooks' {
	declare export default any;
	declare export var performance: PerfHooks;
}

declare module 'shuoRule.json' {
	declare export default {[any]:any};
}

declare type PerfHooks = {
	now: function;
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
