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

const checkChance = (data: Object, stamp: { seed: string, time: number }, reaction: Object): boolean => {
	const { randomBySeed, randomByDate } = getRandomDataSets(stamp.seed);

	Perlin.seed(getRandomDataSets(data.qinId).randomBySeed);
	const noise = Perlin.perlin3(randomBySeed, randomByDate, stamp.time.toFixed(2));

	return (roundNoise(noise) <= reaction.rate);
};

const peelPropsStringToAccessor = (propString/* format e.g. xxx.xxx.xx&damage */): Object => {
	return {
		paramsName: propString.split('&')[0],
		value: propString.split('&')[1],
	};
};

const getConstructDynamic = (callback) => {
	if(!dynamicFunctionCache[callback]) {
		dynamicFunctionCache[callback] = eval(`(() => {return function(params){${callback}};})()`);
	}
	return dynamicFunctionCache[callback];
};

const dynamicReact = (data: Object, reaction: Object, stamp: { seed: string, time: number }): void => {
	const params = {};
	for (const dynamic in reaction.value) {
		for (const prop of reaction.value[dynamic]) {
			const { value, paramsName } = peelPropsStringToAccessor(prop);
			params[paramsName] = value;
		}
	}
	for(const funcName in data.dynamicFunction){
		const func = getConstructDynamic(data.dynamicFunction[funcName]);
		func.call(data, params);
	}
};

export const processReaction = (stamp: { seed: string, time: number }, reactions: Object, data: Object): Object => {
	for (const reaction of reactions) {
		switch (reaction.type) {
			case REACTION.ADD:
				data[reaction.attribute] += reaction.value;
				break;
			case REACTION.MAYBE_ADD:
				if (checkChance(data, stamp, reaction)) {
					data[reaction.attribute] += reaction.value;
				}
				break;
			case REACTION.SET:
				data[reaction.attribute] = reaction.value;
				break;
			case REACTION.MAYBE_SET:
				if (checkChance(data, stamp, reaction)) {
					data[reaction.attribute] = reaction.value;
				}
				break;
			case REACTION.DYNAMIC:
				if (typeof reaction.rate === 'undefined' || checkChance(data, stamp, reaction)) {
					dynamicReact(data, reaction, stamp);
				}
				break;
		}
	}

	return data;
};
