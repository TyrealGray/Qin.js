//@flow
import { createStore, combineReducers } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import * as reducers from './reducers';

export function initStore(): ReduxStore {
	return createStore(combineReducers(reducers),devToolsEnhancer({realtime: true}));
}