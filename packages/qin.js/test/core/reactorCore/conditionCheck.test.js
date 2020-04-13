import { checkCondition } from '../../../src/core/reactorCore/conditionCheck';
import { CONDITION } from '../../../src/core/reactorCore/shuoCore/conditionType';
import { CONDITION_CHECK } from '../../../src/core/reactorCore/shuoCore/conditionCheckType';

describe('conditionCheck', () => {
	test('should match (MORE_THAN) condition', () => {
		let isMatched = checkCondition({ height: 1 }, { [CONDITION.MORE_THAN]: [{ height: 0 }] },
			CONDITION.MORE_THAN, CONDITION_CHECK.MORE_THAN);

		expect(isMatched).toEqual(true);

		isMatched = checkCondition({ height: 0 }, { [CONDITION.MORE_THAN]: [{ height: -1 }] },
			CONDITION.MORE_THAN, CONDITION_CHECK.MORE_THAN);

		expect(isMatched).toEqual(true);

		isMatched = checkCondition({ height: null }, { [CONDITION.MORE_THAN]: [{ height: -1 }] },
			CONDITION.MORE_THAN, CONDITION_CHECK.MORE_THAN);

		expect(isMatched).toEqual(true);
	});

	test('should match (MORE_THAN) condition with more that one props check', () => {
		let isMatched = checkCondition({ height: 1, width: 1}, { [CONDITION.MORE_THAN]: [{ height: 0, width: 0.5 }] },
			CONDITION.MORE_THAN, CONDITION_CHECK.MORE_THAN);

		expect(isMatched).toEqual(true);

		isMatched = checkCondition({ height: 0, width: 0.5 }, { [CONDITION.MORE_THAN]: [{ height: -1, width: 0 }] },
			CONDITION.MORE_THAN, CONDITION_CHECK.MORE_THAN);

		expect(isMatched).toEqual(true);
	});

	test('should match (MORE_THAN) condition with one group of the props checks passed', () => {
		let isMatched = checkCondition({ height: -1, width: 1}, { [CONDITION.MORE_THAN]: [{ height: 0, width: 0.5 },{width:0}] },
			CONDITION.MORE_THAN, CONDITION_CHECK.MORE_THAN);

		expect(isMatched).toEqual(true);

		isMatched = checkCondition({ height: 0, width: -0.5 }, { [CONDITION.MORE_THAN]: [{ height: -1, width: 0 }, {height: -1}] },
			CONDITION.MORE_THAN, CONDITION_CHECK.MORE_THAN);

		expect(isMatched).toEqual(true);
	});

	test('should not match (MORE_THAN) condition', () => {
		let isMatched = checkCondition({ height: 0 }, { [CONDITION.MORE_THAN]: [{ height: 0 }] },
			CONDITION.MORE_THAN, CONDITION_CHECK.MORE_THAN);

		expect(isMatched).toEqual(false);

		isMatched = checkCondition({ height: 0.09 }, { [CONDITION.MORE_THAN]: [{ height: 0.1 }] },
			CONDITION.MORE_THAN, CONDITION_CHECK.MORE_THAN);

		expect(isMatched).toEqual(false);
	});

	test('should not match (MORE_THAN) condition when one of the props checks failed', () => {
		let isMatched = checkCondition({ height: 0, width:2 }, { [CONDITION.MORE_THAN]: [{ height: 0, width:1 }] },
			CONDITION.MORE_THAN, CONDITION_CHECK.MORE_THAN);

		expect(isMatched).toEqual(false);

		isMatched = checkCondition({ height: 0.09, width: 3 }, { [CONDITION.MORE_THAN]: [{ height: 0.1, width:1 }] },
			CONDITION.MORE_THAN, CONDITION_CHECK.MORE_THAN);

		expect(isMatched).toEqual(false);
	});

	test('should match (EQUAL) condition', () => {
		let isMatched = checkCondition({ height: 0 }, { [CONDITION.EQUAL]: [{ height: 0 }] },
			CONDITION.EQUAL, CONDITION_CHECK.EQUAL);

		expect(isMatched).toEqual(true);

		isMatched = checkCondition({ height: -1 }, { [CONDITION.EQUAL]: [{ height: -1 }] },
			CONDITION.EQUAL, CONDITION_CHECK.EQUAL);

		expect(isMatched).toEqual(true);
	});

	test('should not match (EQUAL) condition', () => {
		let isMatched = checkCondition({ height: 0 }, { [CONDITION.EQUAL]: [{ height: 0.1 }] },
			CONDITION.EQUAL, CONDITION_CHECK.EQUAL);

		expect(isMatched).toEqual(false);

		isMatched = checkCondition({ height: -1 }, { [CONDITION.EQUAL]: [{ height: -1.01 }] },
			CONDITION.EQUAL, CONDITION_CHECK.EQUAL);

		expect(isMatched).toEqual(false);
	});

	test('should match (EXCLUDE) condition', () => {
		let isMatched = checkCondition({ height: 0 }, { [CONDITION.EXCLUDE]: [{ none: true }] },
			CONDITION.EXCLUDE, CONDITION_CHECK.EXCLUDE);

		expect(isMatched).toEqual(true);

		isMatched = checkCondition({ height: -1 }, { [CONDITION.EXCLUDE]: [{ none: true }] },
			CONDITION.EXCLUDE, CONDITION_CHECK.EXCLUDE);

		expect(isMatched).toEqual(true);

		isMatched = checkCondition({ height: 0 }, { [CONDITION.EXCLUDE]: [{ height: true }, {width: true}] },
			CONDITION.EXCLUDE, CONDITION_CHECK.EXCLUDE);

		expect(isMatched).toEqual(true);
	});

	test('should not match (EXCLUDE) condition', () => {
		let isMatched = checkCondition({ height: 0 }, { [CONDITION.EXCLUDE]: [{ height: true }] },
			CONDITION.EXCLUDE, CONDITION_CHECK.EXCLUDE);

		expect(isMatched).toEqual(false);

		isMatched = checkCondition({ height: 0 }, { [CONDITION.EXCLUDE]: [{ height: true, width:true }, { height: true }] },
			CONDITION.EXCLUDE, CONDITION_CHECK.EXCLUDE);

		expect(isMatched).toEqual(false);

		isMatched = checkCondition({ height: -1, width:0 }, { [CONDITION.EXCLUDE]: [{ height: true }, { width: true }] },
			CONDITION.EXCLUDE, CONDITION_CHECK.EXCLUDE);

		expect(isMatched).toEqual(false);
	});

	test('should match (EXCLUDE) condition with one group of the props checks pass', () => {
		let isMatched = checkCondition({ height: 0, width:0 }, { [CONDITION.EXCLUDE]: [{ none: true, height:true }, {none: true}] },
			CONDITION.EXCLUDE, CONDITION_CHECK.EXCLUDE);

		expect(isMatched).toEqual(true);

		isMatched = checkCondition({ height: -1, width:0.5 }, { [CONDITION.EXCLUDE]: [{ none: true, height: true }, {none: true}] },
			CONDITION.EXCLUDE, CONDITION_CHECK.EXCLUDE);

		expect(isMatched).toEqual(true);
	});

	test('should match (LESS_THAN) condition', () => {
		let isMatched = checkCondition({ height: -0.1 }, { [CONDITION.LESS_THAN]: [{ height: 0 }] },
			CONDITION.LESS_THAN, CONDITION_CHECK.LESS_THAN);

		expect(isMatched).toEqual(true);

		isMatched = checkCondition({ height: -1.1 }, { [CONDITION.LESS_THAN]: [{ height: -1 }] },
			CONDITION.LESS_THAN, CONDITION_CHECK.LESS_THAN);

		expect(isMatched).toEqual(true);
	});

	test('should not match (LESS_THAN) condition', () => {
		let isMatched = checkCondition({ height: -0.1 }, { [CONDITION.LESS_THAN]: [{ height: 0 }] },
			CONDITION.LESS_THAN, CONDITION_CHECK.LESS_THAN);

		expect(isMatched).toEqual(true);

		isMatched = checkCondition({ height: -1.1 }, { [CONDITION.LESS_THAN]: [{ height: -1 }] },
			CONDITION.LESS_THAN, CONDITION_CHECK.LESS_THAN);

		expect(isMatched).toEqual(true);
	});

	test('should match (INCLUDE) condition', () => {
		let isMatched = checkCondition({ height: 0 }, { [CONDITION.INCLUDE]: [{ height: true }] },
			CONDITION.INCLUDE, CONDITION_CHECK.INCLUDE);

		expect(isMatched).toEqual(true);

		isMatched = checkCondition({ height: -1 }, { [CONDITION.INCLUDE]: [{ height: true }, {width: true}, {height: true, width: true}] },
			CONDITION.INCLUDE, CONDITION_CHECK.INCLUDE);

		expect(isMatched).toEqual(true);

		isMatched = checkCondition({ height: 0,width: 0 }, { [CONDITION.INCLUDE]: [{ height: true, width: true }, { heat: true}] },
			CONDITION.INCLUDE, CONDITION_CHECK.INCLUDE);

		expect(isMatched).toEqual(true);
	});

	test('should not match (INCLUDE) condition', () => {
		let isMatched = checkCondition({ height: 0 }, { [CONDITION.INCLUDE]: [{ height: true, width: true }] },
			CONDITION.INCLUDE, CONDITION_CHECK.INCLUDE);

		expect(isMatched).toEqual(false);

		isMatched = checkCondition({ height: 0 }, { [CONDITION.INCLUDE]: [{ width:true }] },
			CONDITION.INCLUDE, CONDITION_CHECK.INCLUDE);

		expect(isMatched).toEqual(false);
	});
});