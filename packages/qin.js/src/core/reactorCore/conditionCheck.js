//@flow
import { CONDITION_CHECK } from './shuoCore/conditionCheckType';

export const peelPropsString = (propsString:string) => {
	return {
		peeledPropArray: propsString.split('-'),
	};
};

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
			const { peeledPropArray } = peelPropsString(prop);

			let value = data;
			for (let i = 0; i < peeledPropArray.length; i++) {
				value = value[peeledPropArray[i]];
			}

			if (checkCallback(expectConditionProps[prop], value)) {
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
