//@flow
import Perlin from 'perlin.js';
import { REACTION } from './shuoCore/reactionType';
import randomSeed from './shuoCore/randomSeed';

const dynamicFunctionCache = {};

const roundNoise = (noise: number): number => {
	return parseFloat(((noise + 1.0) / 2.0).toFixed(2));
};

const getRandomDataSets = (seed) => {
	randomSeed.setSeed(seed);
	const randomBySeed = randomSeed.random();
	const randomByDate = randomSeed.randomByDate();

	return { randomBySeed, randomByDate };
};

export const checkChanceByTicker = (stamp: { seed: string, time: number }, rate: number): boolean => {
	const { randomBySeed, randomByDate } = getRandomDataSets(stamp.seed);

	Perlin.seed(stamp.seed);
	const noise = Perlin.perlin3(randomBySeed, randomByDate, stamp.time);

	return (roundNoise(noise) <= rate);
};

const checkChance = (data: Object, reaction: Object, stamp: { seed: string, time: number }): boolean => {
	const { randomBySeed, randomByDate } = getRandomDataSets(stamp.seed);

	Perlin.seed(getRandomDataSets(data.qinId).randomBySeed);
	const noise = Perlin.perlin3(randomBySeed, randomByDate, stamp.time.toFixed(2));

	return (roundNoise(noise) <= reaction.rate);
};

const checkDynamicParamFlag = (param: string): boolean => {

	switch (param) {
		case '_tb':
			return true;
	}

	return false;
};

const getDynamicParamValueByFlag = (param: string, value:string, action:{type: string, triggerBy: any, triggerTo: any, stamp: { seed: string, time: number }}): any => {
	const { peeledPropArray } = peelPropsString(value);

	switch (param) {
		case '_tb':
			return getObjectValueByPeeledPropArray(action.triggerBy, peeledPropArray);
	}

	return value;
};

const getObjectValueByPeeledPropArray = (object: any, peeledPropArray: string[]): any => {
	let value = object;
	for (let i = 0; i < peeledPropArray.length; i++) {
		value = value[peeledPropArray[i]];
	}

	return value;
};

const peelParamsString = (propString/* format e.g. xx&damage */, action:{type: string, triggerBy: any, triggerTo: any, stamp: { seed: string, time: number }}): Object => {

	const paramsName = propString.split('&')[0];

	let value = propString.split('&')[1];
	if (checkDynamicParamFlag(paramsName)) {
		value = getDynamicParamValueByFlag(paramsName, value, action);
	}


	return {
		paramsName,
		value,
	};
};

export const peelPropsString = (propsString: string) => {
	return {
		peeledPropArray: propsString.split('-'),
	};
};

const getConstructDynamic = (callback) => {
	if (!dynamicFunctionCache[callback]) {
		dynamicFunctionCache[callback] = eval(`(() => {return function(_p){${callback}};})()`);
	}
	return dynamicFunctionCache[callback];
};

const dynamicReact = (data: Object, reaction: Object, action:{type: string, triggerBy: any, triggerTo: any, stamp: { seed: string, time: number }}): void => {
	if (typeof reaction.rate !== 'undefined' && !checkChance(data, reaction, action.stamp)) {
		return;
	}

	const params = {};
	for (const dynamic in reaction.value) {
		for (const prop of reaction.value[dynamic]) {
			const { value, paramsName } = peelParamsString(prop, action);
			params[paramsName] = value;
		}
	}
	for (const funcName in data.dynamicFunction) {
		const func = getConstructDynamic(data.dynamicFunction[funcName]);
		func.call(data, params);
	}
};

const commonReact = (data: Object, reaction: Object, action:{type: string, triggerBy: any, triggerTo: any, stamp: { seed: string, time: number }}): void => {
	const { peeledPropArray } = peelPropsString(reaction.attribute);

	let value = data;
	let accessProp = null;
	for (let i = 0; i < peeledPropArray.length; i++) {
		if (peeledPropArray.length - 1 === i) {
			accessProp = peeledPropArray[i];
			break;
		}
		value = value[peeledPropArray[i]];
	}

	switch (reaction.type) {
		case REACTION.ADD:
			value[accessProp] += reaction.value;
			break;
		case REACTION.MAYBE_ADD:
			if (checkChance(data, reaction, action.stamp)) {
				value[accessProp] += reaction.value;
			}
			break;
		case REACTION.SET:
			value[accessProp] = reaction.value;
			break;
		case REACTION.MAYBE_SET:
			if (checkChance(data, reaction, action.stamp)) {
				value[accessProp] = reaction.value;
			}
			break;
	}
};

export const processReaction = (action: {type: string, triggerBy: any, triggerTo: any, stamp: { seed: string, time: number }}, reactions: Object, data: Object): Object => {
	for (const reaction of reactions) {
		switch (reaction.type) {
			case REACTION.ADD:
			case REACTION.MAYBE_ADD:
			case REACTION.SET:
			case REACTION.MAYBE_SET:
				commonReact(data, reaction, action);
				break;
			case REACTION.DYNAMIC:
				dynamicReact(data, reaction, action);
				break;
		}
	}

	return data;
};
