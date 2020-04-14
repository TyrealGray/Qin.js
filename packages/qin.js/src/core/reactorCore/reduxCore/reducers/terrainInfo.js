import produce from 'immer';
import { STORE_CONNECT_REACTOR } from '../actions/actionTypes';
import { REACTION } from '../../shuoCore/reactionType';

const initialState = {
	dataSet: [],
};

const processReaction = (reactions, data) => {
	for (const reaction of reactions) {
		switch (reaction.type) {
			case REACTION.ADD:
				data[reaction.attribute] += reaction.value;
				break;
			// case REACTION.MAYBE_ADD:
			// 	if(randomCheck(seed)){
			// 		data[reaction.props] += reaction.value;
			// 	}
			// 	break;
			//...
		}
	}
	return data;
};

export const terrainInfoContent = { terrainInfo: initialState };

export const terrainInfo = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case STORE_CONNECT_REACTOR:
				return action.payload.terrainInfo;
		}

		const { type, triggerBy, triggerTo } = action;
		draft.dataSet.forEach((data, index) => {
			if (data.eventMap[type]) {
				const { onlyDirect, isAny, types, triggers, blockers } = data.eventMap[type];
				if (
					(onlyDirect && triggerTo?.qinId !== data.qinId)
					|| blockers.includes(triggerBy?.qinId)
					|| (!isAny && !types.includes(triggerBy?.type) && !triggers.includes(triggerBy?.qinId))
				) {
					return;
				}
				/* reaction -> e.g: [
					{type:ADD, attribute:'hp', value: 100 },
					{type:MAYBE_ADD, attribute:'mp', rate: 0.9 , value: 0 },
				] */
				const reactions = data.eventMap[type].reactions;
				// processReaction is a function in common util
				draft.dataSet[index] = processReaction(reactions, data);
			}
		});
	});