import produce from 'immer';
import { STORE_CONNECT_REACTOR } from '../actions/actionTypes';

const initialState = {
	tick: 0,
};

export const eventTimeInfoContent = { eventTimeInfo: initialState };

export const eventTimeInfo = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case STORE_CONNECT_REACTOR:
				return action.payload.gameInfo;
		}
	});