import { CONDITION } from './conditionType';

export const CONDITION_CHECK = {
	[CONDITION.MORE_THAN]: (expectCondition: Object, actualData: Object) => {
		return expectCondition < actualData;
	},
	[CONDITION.EQUAL]: (expectCondition: Object, actualData: Object) => {
		return expectCondition === actualData;
	},
	[CONDITION.LESS_THAN]: (expectCondition: Object, actualData: Object) => {
		return expectCondition > actualData;
	},
	[CONDITION.INCLUDE]: (expectCondition: Object, actualData: Object) => {
		return typeof actualData !== 'undefined' && actualData !== null;
	},
	[CONDITION.EXCLUDE]: (expectCondition: Object, actualData: Object) => {
		return typeof actualData === 'undefined' || actualData === null;
	},
};