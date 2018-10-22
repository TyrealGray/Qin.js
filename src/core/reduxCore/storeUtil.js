//@flow
import { createStore, combineReducers } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import * as reducers from './reducers/index';

export function initStore(isDebugRedux: boolean): ReduxStore {
	return createStore(combineReducers(reducers), devToolsEnhancer({realtime: isDebugRedux, port:9009}));
}