import produce from 'immer';
import {
	REACTOR_START,
	RECORD_EVENT_TIME,
	STORE_CONNECT_REACTOR,
} from '../actions/actionTypes';

const initialState = {
	dataSet: {},
};

export const eventTimeInfoContent = { eventTimeInfo: initialState };

export const eventTimeInfo = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case STORE_CONNECT_REACTOR:
				return action.payload.eventTimeInfo;
			case RECORD_EVENT_TIME:
				draft.dataSet[action.name] = {
					time: action.time,
					cycle: action.cycle,
				};
				break;
			case REACTOR_START:
				for (const name in draft.dataSet) {
					const trigger = draft.dataSet[name];
					draft.dataSet[name] = {
						time: trigger.time % trigger.cycle,
						cycle: trigger.cycle,
					};
				}
		}
	});
