import { STORE_CONNECT_REACTOR } from '../actions/actionTypes';

const initialState = {
	characters: {},
	characterIDs: {},
};

export function characterInfo(state = initialState, action) {
	switch (action.type) {
		case STORE_CONNECT_REACTOR:
			return {
				...state,
				characterIDs: action.payload.content.characterIDs,
				characters: action.payload.content.characters,
			};
		default:
			return state;
	}
}
