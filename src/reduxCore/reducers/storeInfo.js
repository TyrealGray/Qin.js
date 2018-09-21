import { STORE_INIT } from '../actions/actionTypes';

const initialState = {
	isInit: false,
};

export function storeInfo(state = initialState, action) {

	switch (action.type) {
		case STORE_INIT:
			return {
				...state,
				isInit: true,
			};
		default:
			return state;
	}
}