declare module 'pouchdb' {
	declare export default any;
}


declare type ReduxStore = {
	dispatch: function;
	getState: function;
	subscribe: function;
	unsubscribe: function;
};

declare module 'redux' {
	declare export function createStore(any, any): any;
	declare export function combineReducers(any): any;
}

declare module 'remote-redux-devtools' {
	declare export default any;
}
