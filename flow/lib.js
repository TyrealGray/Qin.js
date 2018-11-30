declare module 'pouchdb' {
	declare export default any;
}

declare module 'pouchdb-find' {
	declare export default any;
}

declare module 'shuoRule.json' {
	declare export default {[any]:any};
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
