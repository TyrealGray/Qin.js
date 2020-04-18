import produce from 'immer';
import { STORE_CONNECT_REACTOR } from '../actions/actionTypes';
import { processReaction } from '../../processReaction';

const initialState = {
	dataSet:[],
};

export const characterInfoContent = { characterInfo: initialState };

export const characterInfo = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case STORE_CONNECT_REACTOR:
				return action.payload.characterInfo;
		}


		const { type, triggerBy, triggerTo, stamp } = action;
		draft.dataSet.forEach((data, index) => {
			if (data.eventMap[type]) {
				const { onlyDirect, isAny, types, triggers, blockers } = data.eventMap[type];
				if (
					(onlyDirect && triggerTo?.qinId !== data.qinId)
					|| blockers.includes(triggerBy.qinId)
					|| (!isAny && !types.includes(triggerBy.type) && !triggers.includes(triggerBy.qinId))
				) {
					return;
				}
				/* reaction -> e.g: [
					{type:ADD, attribute:'hp', value: 100 },
					{type:MAYBE_ADD, attribute:'mp', rate: 0.9 , value: 0 },
				] */
				const reactions = data.eventMap[type].reactions;
				draft.dataSet[index] = processReaction(stamp, reactions, data);
			}
		});
	});