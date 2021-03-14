import { CONDITION } from './conditionType';
import { REACTION } from './reactionType';

export default {
	npcs: [
		{
			attribute: {
				type: 'npc',
				relationship: {
					player: 'good',
				},
			},
			dynamicFunction: {
				setRelation: `
				if(_p._tb > -1){
				this.relationship.player = 'bad';
				}
				else{
				this.relationship.player = 'good';
				}
				`,
			},
			eventMap: {
				RAIN_STOP: {
					onlyDirect: false,
					isAny: false,
					types: ['terrain'],
					triggers: [],
					blockers: [],
					reactions: [
						{
							type: REACTION.DYNAMIC,
							value: {
								'setRelation': ['_tb&weather-temperature'],
							},
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
			dynamicFunction: {
				rainBig: `
				this.weather.rain = true;
				`,
				rainStop: `
				if(this.weather.rain && this.weather.temperature <= -2){
				this.weather.rain = false;
				}
				`,
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
						{
							type: REACTION.DYNAMIC,
							value: {
								'rainBig': [''],
							},
						},
					],
				},
				RAIN_STOP: {
					onlyDirect: false,
					isAny: true,
					types: [],
					triggers: [],
					blockers: [],
					reactions: [
						{
							type: REACTION.DYNAMIC,
							value: {
								'rainStop': [''],
							},
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
				{
					name: 'RAIN_STOP',
					type: 'weather',
					conditions: {
						[CONDITION.EQUAL]: [{ 'weather-rain': true }],
					},
					duration: 5000,
					discardOthers: true,
					triggerLimit: 5000, // must have unless we want this event trigger all the time
				},
			],
		},
	],
};
