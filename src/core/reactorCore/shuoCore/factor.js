export default {
	characters: [
		{
			displayName: 'houyi',
			renderSet: {
				IS_CONTAIN_ANIMATION: true,
				DATA: {
					STAND: {
						NAME: 'houyi_stand',
						SPEED: 0.025,
						PATH:
							'./assets/characters/HouYi/houyi_stand/houyi_stand.json',
					},
					WALK: {
						NAME: 'houyi_walk',
						SPEED: 0.08,
						PATH:
							'./assets/characters/HouYi/houyi_walk/houyi_walk.json',
					},
					ATTACK: {
						NAME: 'houyi_attack',
						SPEED: 0.25,
						PATH:
							'./assets/characters/HouYi/houyi_attack/houyi_attack.json',
					},
					ULTIMATE: {
						NAME: 'houyi_ultimate',
						SPEED: 0.25,
						PATH:
							'./assets/characters/HouYi/houyi_ultimate/houyi_ultimate.json',
					},
					BATTLE: {
						NAME: 'houyi_battle',
						SPEED: 0.025,
						PATH:
							'./assets/characters/HouYi/houyi_battle/houyi_battle.json',
					},
					NEAR_DEATH: {
						NAME: 'houyi_nearDeath',
						SPEED: 0.025,
						PATH:
							'./assets/characters/HouYi/houyi_nearDeath/houyi_nearDeath.json',
					},
					DYING: {
						NAME: 'houyi_dying',
						SPEED: 0.08,
						PATH:
							'./assets/characters/HouYi/houyi_dying/houyi_dying.json',
					},
				},
			},
			coordinates: {
				x: 1,
				y: 1,
			},
		},
	],
	terrains: [
		{
			attribute: {
				type: 'terrain',
				height: 8,
				width: 8,
				heightRange: { max: 99, min: 3 },
			},
		},
	],
	rules:[{
		attribute: {
			type: 'terrain',
		},
		eventTriggers: [
			{
				name: 'RAIN_BIG',
				type: 'weather',
				condition: {
					moreThan: [{ height: 4 }],
				},
				discardOthers: true,
				rate: 0.9,
				timeOut: 5000,
			},
		],
	}],
};
