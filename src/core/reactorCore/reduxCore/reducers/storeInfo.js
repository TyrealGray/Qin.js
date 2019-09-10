import { STORE_CONNECT_REACTOR, STORE_INIT } from '../actions/actionTypes';

const initialState = {
	isInit: false,
	content: null,
};

export function storeInfo(state = initialState, action) {

	switch (action.type) {
		case STORE_INIT:
			return {
				...state,
				isInit: true,
			};
		case STORE_CONNECT_REACTOR:
			return {
				...state,
				content: action.payload.content,
			};
		default:
			return state;
	}
}