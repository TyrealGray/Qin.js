import produce from 'immer';
import { STORE_INIT } from '../actions/actionTypes';

const initialState = {
	isInit: false,
};

export const storeInfo = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case STORE_INIT:
				draft.isInit = true;
				break;
		}
	});