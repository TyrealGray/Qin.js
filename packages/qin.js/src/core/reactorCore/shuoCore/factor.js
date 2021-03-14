import { CONDITION } from './conditionType';
import { REACTION } from './reactionType';

export default {
	npcs: [
		{
			attribute: {
				type: 'npc',
				relationship: {
					player: 'good',
					npcs: [{ name: 'jack', value: 'bad' }],
				},
			},
			dynamicFunction: {
				testCB: `
				this.relationship.player = params.player;
				`,
				testNewCB: `
				for(const npc of this.relationship.npcs){
					if(npc.name === params.name){
						npc.value = params.value;
						break;
					}
				}
				`,
			},
			eventMap: {
				NPC_CHECK_AROUND: {
					onlyDirect: false,
					isAny: true,
					types: [],
					triggers: [],
					blockers: [],
					reactions: [
						{
							type: REACTION.DYNAMIC,
							value: {
								'testCB': ['player&bad'],
								'testNewCB': ['name&jack', 'value&good'],
							},
							rate: 0.5,
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
				weather: { temperature: 0 },
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
							attribute: 'weather-temperature',
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
						[CONDITION.EXCLUDE]: [{ moving: false }],
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
						[CONDITION.MORE_THAN]: [{ 'weather-temperature': -2 }],
					},
					duration: 5000,
					discardOthers: true,
					rate: 0.4,
					triggerLimit: 5000, // must have unless we want this event trigger all the time
				},
			],
		},
	],
};
