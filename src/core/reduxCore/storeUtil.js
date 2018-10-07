//@flow
import { createStore, combineReducers } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import * as reducers from './reducers/index';

export function initStore(debugRedux: boolean): ReduxStore {
	return createStore(combineReducers(reducers), devToolsEnhancer({realtime: debugRedux, port:9009}));
}