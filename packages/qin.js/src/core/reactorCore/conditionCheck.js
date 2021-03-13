//@flow
import { CONDITION_CHECK } from './shuoCore/conditionCheckType';

export const checkCondition = (
	data: Object,
	conditions: Object,
	condition: string,
	checkCallback: (Object, Object) => boolean,
): Object | null => {
	for (const expectConditionProps of conditions[condition]) {
		let matched = 0;
		let props = [];
		for (const prop in expectConditionProps) {
			if (checkCallback(expectConditionProps[prop], data[prop])) {
				matched++;
				props.push(prop);
			}
		}
		if (matched === Object.entries(expectConditionProps).length) {
			return { props, condition };
		}
	}

	return null;
};

export const checkConditions = (
	data: Object,
	conditions: Object,
): Object | null => {

	for (const condition in conditions) {
		const trigger = checkCondition(
			data,
			conditions,
			condition,
			CONDITION_CHECK[condition],
		);

		if (trigger) {
			return trigger;
		}
	}

	return null;
};
