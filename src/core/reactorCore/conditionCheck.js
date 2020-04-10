import {CONDITION} from './shuoCore/conditionType';

export const checkConditions = (status: Object, conditions: Object): boolean => {
    for (const condition in conditions) {
        switch (condition) {
            case CONDITION.MORE_THAN:
                for (const moreThanProps of conditions[
                    CONDITION.MORE_THAN
                    ]) {
                    let matched = 0;
                    for (const prop in moreThanProps) {
                        if (moreThanProps[prop] < status[prop]) {
                            matched++;
                        }

                        if (
                            matched === Object.entries(moreThanProps).length
                        ) {
                            return true;
                        }
                    }
                }
                break;
            case CONDITION.EQUAL:
                for (const equalProps of conditions[CONDITION.EQUAL]) {
                    let matched = 0;
                    for (const prop in equalProps) {
                        if (equalProps[prop] === status[prop]) {
                            matched++;
                        }

                        if (matched === Object.entries(equalProps).length) {
                            return true;
                        }
                    }
                }
                break;
            case CONDITION.LESS_THAN:
                for (const lessThanProps of conditions[
                    CONDITION.LESS_THAN
                    ]) {
                    let matched = 0;
                    for (const prop in lessThanProps) {
                        if (lessThanProps[prop] > status[prop]) {
                            matched++;
                        }

                        if (
                            matched === Object.entries(lessThanProps).length
                        ) {
                            return true;
                        }
                    }
                }
                break;
            case CONDITION.EXCLUDE:
                for (const excludeProps of conditions[CONDITION.EXCLUDE]) {
                    let matched = 0;
                    for (const prop in excludeProps) {
                        if (status[prop]) {
                            matched++;
                        }
                    }

                    if (matched === 0) {
                        return true;
                    }
                }
                break;
            case CONDITION.INCLUDE:
                for (const includeProps of conditions[CONDITION.INCLUDE]) {
                    let matched = 0;
                    for (const prop in includeProps) {
                        if (status[prop]) {
                            matched++;
                        }

                        if (
                            matched === Object.entries(includeProps).length
                        ) {
                            return true;
                        }
                    }
                }
                break;
            default:
                break;
        }
    }

    return false;
};