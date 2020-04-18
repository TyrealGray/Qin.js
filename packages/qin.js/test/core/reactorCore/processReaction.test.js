import { checkChance } from '../../../src/core/reactorCore/processReaction';

describe('checkChance', () => {
	test('should have chance', () => {
		expect(
			checkChance(
				{ qinId: 'testId' },
				{ time: 0, seed: 'testSeed' },
				{ rate: 0.9 },
			),
		).toEqual(true);

		expect(
			checkChance(
				{ qinId: 'testId' },
				{ time: 0, seed: 'testSeed' },
				{ rate: 0.46 },
			),
		).toEqual(true);
	});

	test('should not have chance', () => {
		expect(
			checkChance(
				{ qinId: 'testId' },
				{ time: 0, seed: 'testSeed' },
				{ rate: 0.45 },
			),
		).toEqual(false);
	});
});
