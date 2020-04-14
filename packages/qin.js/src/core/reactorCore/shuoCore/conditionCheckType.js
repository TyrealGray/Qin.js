export const CONDITION_CHECK = {
	MORE_THAN: (expectCondition: Object, actualData: Object) => {
		return expectCondition < actualData;
	},
	EQUAL: (expectCondition: Object, actualData: Object) => {
		return expectCondition === actualData;
	},
	LESS_THAN: (expectCondition: Object, actualData: Object) => {
		return expectCondition > actualData;
	},
	INCLUDE: (expectCondition: Object, actualData: Object) => {
		return typeof actualData !== 'undefined' && actualData !== null;
	},
	EXCLUDE: (expectCondition: Object, actualData: Object) => {
		return typeof actualData === 'undefined' || actualData === null;
	},
};