import produce from 'immer';
import { STORE_CONNECT_REACTOR } from '../actions/actionTypes';

const initialState = {
	terrains: [],
};

export const terrainInfo = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case STORE_CONNECT_REACTOR:
				return action.payload.terrainInfo;
		}
	});