//@flow
import { createStore, combineReducers } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import * as reducers from './reducers';

export function initStore(debugRedux): ReduxStore {
	return createStore(combineReducers(reducers), devToolsEnhancer({realtime: debugRedux, port:8000}));
}