import produce from 'immer';
import { STORE_CONNECT_REACTOR } from '../actions/actionTypes';
import { processReaction } from '../../processReaction';

const initialState = {
	dataSet: [],
};

export const npcInfoContent = { npcInfo: initialState };

export const npcInfo = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case STORE_CONNECT_REACTOR:
				return action.payload.npcInfo;
		}

		const { type, triggerBy, triggerTo } = action;
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
				draft.dataSet[index] = processReaction(action, reactions, data);
			}
		});
	});
