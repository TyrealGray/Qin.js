import { STORE_CONNECT_REACTOR } from '../actions/actionTypes';

const initialState = {
	characters: {},
};

export function characterInfo(state = initialState, action) {
	switch (action.type) {
		case STORE_CONNECT_REACTOR:
			return {
				characters: action.payload.Characters,
			};
		default:
			return state;
	}
}
