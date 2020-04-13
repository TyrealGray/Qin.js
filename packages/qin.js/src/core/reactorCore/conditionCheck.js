//@flow
import { CONDITION } from './shuoCore/conditionType';
import { CONDITION_CHECK } from './shuoCore/conditionCheckType';

export const checkCondition = (status: Object, conditions: Object, condition: string, checkCallback: (Object, Object) => boolean): boolean => {
	for (const expectConditionProps of conditions[
		condition
		]) {
		let matched = 0;
		for (const prop in expectConditionProps) {
			if (checkCallback(expectConditionProps[prop], status[prop])) {
				matched++;
			}

			if (
				matched === Object.entries(expectConditionProps).length
			) {
				return true;
			}
		}
	}

	return false;
};

export const checkConditions = (status: Object, conditions: Object): boolean => {
	for (const condition in conditions) {
		switch (condition) {
			case CONDITION.MORE_THAN:
				if(checkCondition(status, conditions, CONDITION.MORE_THAN, CONDITION_CHECK.MORE_THAN)){
					return true;
				}
				break;
			case CONDITION.EQUAL:
				if(checkCondition(status, conditions, CONDITION.EQUAL, CONDITION_CHECK.EQUAL)){
					return true;
				}
				break;
			case CONDITION.LESS_THAN:
				 if(checkCondition(status, conditions, CONDITION.LESS_THAN, CONDITION_CHECK.LESS_THAN)){
				 	return true;
				 }
				 break;
			case CONDITION.EXCLUDE:
				if(checkCondition(status, conditions, CONDITION.EXCLUDE, CONDITION_CHECK.EXCLUDE)){
					return true;
				}
				break;
			case CONDITION.INCLUDE:
				if(checkCondition(status, conditions, CONDITION.INCLUDE, CONDITION_CHECK.INCLUDE)){
					return true;
				}
				break;
			default:
				break;
		}
	}

	return false;
};