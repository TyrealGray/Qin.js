import {CONDITION} from './conditionType';
import {REACTION} from './reactionType';

export default {
	characters: [
		{
			npcType: 'HOUYI',
			displayName: 'houyi',
			renderSet: {
				IS_CONTAIN_ANIMATION: true,
				DATA: [
					{
						TYPE: 'STAND',
						NAME: 'houyi_stand',
						SPEED: 0.025,
						PATH:
							'./assets/characters/HouYi/houyi_stand/houyi_stand.json',
					},
					{
						TYPE: 'WALK',
						NAME: 'houyi_walk',
						SPEED: 0.08,
						PATH:
							'./assets/characters/HouYi/houyi_walk/houyi_walk.json',
					},
					{
						TYPE: 'ATTACK',
						NAME: 'houyi_attack',
						SPEED: 0.25,
						PATH:
							'./assets/characters/HouYi/houyi_attack/houyi_attack.json',
					},
					{
						TYPE: 'ULTIMATE',
						NAME: 'houyi_ultimate',
						SPEED: 0.25,
						PATH:
							'./assets/characters/HouYi/houyi_ultimate/houyi_ultimate.json',
					},
					{
						TYPE: 'BATTLE',
						NAME: 'houyi_battle',
						SPEED: 0.025,
						PATH:
							'./assets/characters/HouYi/houyi_battle/houyi_battle.json',
					},
					{
						TYPE: 'NEAR_DEATH',
						NAME: 'houyi_nearDeath',
						SPEED: 0.025,
						PATH:
							'./assets/characters/HouYi/houyi_nearDeath/houyi_nearDeath.json',
					},
					{
						TYPE: 'DYING',
						NAME: 'houyi_dying',
						SPEED: 0.08,
						PATH:
							'./assets/characters/HouYi/houyi_dying/houyi_dying.json',
					},
				],
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
			eventMap:{
				RAIN_BIG: {
					onlyDirect: false, isAny: true,
					types: [],
					triggers: [],
					blockers: [],
					reactions: [{
						type: REACTION.ADD, attribute: 'temperature',
						value: -1,
					}],
				},
			},
		},
	],
	rules: [
		{
			attribute: {
				type: 'terrain',
			},
			eventTriggers: [
				{
					name: 'RAIN_BIG',
					type: 'weather',
					conditions: {
						[CONDITION.EXCLUDE]: [{none:true}],
					},
					discardOthers: true,
					rate: 0.9,
					timeOut: 5000,
				},
			],
		},
	],
};
