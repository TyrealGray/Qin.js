//@flow
import { CONDITION } from './conditionType';

export const CONDITION_CHECK = {
	[CONDITION.MORE_THAN]: (expectCondition: any, actualData: any) => {
		return expectCondition < actualData;
	},
	[CONDITION.EQUAL]: (expectCondition: any, actualData: any) => {
		return expectCondition === actualData;
	},
	[CONDITION.LESS_THAN]: (expectCondition: any, actualData: any) => {
		return expectCondition > actualData;
	},
	[CONDITION.INCLUDE]: (expectCondition: any, actualData: any) => {
		return typeof actualData !== 'undefined' && actualData !== null;
	},
	[CONDITION.EXCLUDE]: (expectCondition: any, actualData: any) => {
		return typeof actualData === 'undefined' || actualData === null;
	},
};
