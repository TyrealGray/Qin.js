import produce from 'immer';
import { STORE_CONNECT_REACTOR } from '../actions/actionTypes';

const initialState = {
	characters: [],
};

export const characterInfo = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case STORE_CONNECT_REACTOR:
				return action.payload.content.characterInfo;
		}
	});