//@flow
import { STORE_INIT } from './actionTypes';

export type ActionType = {
	type: string;
}

export function storeInit(): ActionType {
	return {
		type: STORE_INIT,
	}
}