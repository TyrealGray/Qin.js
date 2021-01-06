import { CONDITION } from './conditionType';
import { NPC_REACTION, REACTION } from './reactionType';

export default {
	npcs: [
		{
			attribute: {
				type: 'npc',
			},
			eventMap: {
				NPC_GO_AROUND: {
					onlyDirect: false,
					isAny: true,
					types: [],
					triggers: [],
					blockers: [],
					reactions: [
						{
							type: NPC_REACTION.WALK,
							//TODO: need a dynamic flag to let processReaction.js create a dynamic case for npc to walk around a grid system object
							value: -0.5,
						},
					],
				},
			},
		},
	],
	terrains: [
		{
			attribute: {
				type: 'terrain',
				height: 0,
				width: 8,
				altitudeMax: 99,
				altitudeMin: 3,
				temperature: 0,
			},
			eventMap: {
				RAIN_BIG: {
					onlyDirect: false,
					isAny: true,
					types: [],
					triggers: [],
					blockers: [],
					reactions: [
						{
							type: REACTION.MAYBE_ADD,
							attribute: 'temperature',
							value: -0.5,
							rate: 0.5,
						},
					],
				},
			},
		},
	],
	rules: [
		{
			attribute: {
				type: 'npc',
			},
			eventTriggers: [
				{
					name: 'NPC_CHECK_AROUND',
					type: 'npcAction',
					priority: 0,
					conditions: {
						[CONDITION.EQUAL]: [{ moving: false }],
					},
					triggerLimit: 5000,
				},
				{
					name: 'NPC_GO_AROUND',
					type: 'npcAction',
					priority: 0,
					conditions: {
						[CONDITION.EQUAL]: [{ moving: false }],
					},
					rate: 0.35,
					triggerLimit: 5000,
				},
			],
		},
		{
			attribute: {
				type: 'terrain',
			},
			eventTriggers: [
				{
					name: 'RAIN_BIG',
					type: 'weather',
					conditions: {
						[CONDITION.EXCLUDE]: [{ none: true }],
					},
					duration: 5000,
					discardOthers: true,
					rate: 0.4,
					triggerLimit: 5000,
				},
			],
		},
	],
};
