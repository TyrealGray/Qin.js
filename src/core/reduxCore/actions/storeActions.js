//@flow
import { STORE_CONNECT_REACTOR, STORE_INIT } from './actionTypes';

export type ActionType = {
	type: string;
	payload: Object;
};

export function storeInit(): ActionType {
	return {
		type: STORE_INIT,
		payload: {},
	};
}

export function storeConnectReactor(reactorData: Object): ActionType {
	return {
		type: STORE_CONNECT_REACTOR,
		payload: reactorData,
	};
}
