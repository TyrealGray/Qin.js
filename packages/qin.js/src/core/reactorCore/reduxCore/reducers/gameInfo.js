import produce from 'immer';
import { STORE_CONNECT_REACTOR } from '../actions/actionTypes';

const initialState = {
	seed: null,
};

export const gameInfoContent = { gameInfo: initialState };

export const gameInfo = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case STORE_CONNECT_REACTOR:
				return action.payload.gameInfo;
		}
	});