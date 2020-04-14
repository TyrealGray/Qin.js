//@flow
import { createStore, combineReducers } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import { reducers } from './reducers';

export function initStore(isDebugRedux: boolean): ReduxStore {
	return createStore(combineReducers(reducers), devToolsEnhancer({ realtime: isDebugRedux, port: 1029 }));
}