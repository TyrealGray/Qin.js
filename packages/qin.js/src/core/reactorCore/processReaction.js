//@flow
import Perlin from 'perlin.js';
import { REACTION } from './shuoCore/reactionType';
import randomSeed from './shuoCore/randomSeed';

export const checkChance = (data: Object, stamp: {seed: string, time: number}, reaction: Object):boolean => {
	randomSeed.setSeed(stamp.seed);
	const randomBySeed = randomSeed.random();
	const randomByDate = randomSeed.randomByDate();
	randomSeed.setSeed(data.qinId);
	const randomByData = randomSeed.random();
	Perlin.seed(randomByData);
	const noise = Perlin.perlin3(randomBySeed, randomByDate, stamp.time.toFixed(2));

	const chance = ((noise + 1.0) / 2.0).toFixed(2);

	return (chance <= reaction.rate);
};

const peelPropsStringToAccessor = (propString/* format e.g. xxx.xxx.xx&damage */):Object => {
	return {
		paramsName: propString.split('&')[1],
		peeledPropArray:propString.split('&')[0].split('.'),
	};
};

const dynamicReact = (data: Object, reaction:Object, stamp: {seed: string, time: number}):void => {
	for(const dynamic of reaction.dynamic){
		let accessor = data;
		const params = {};
		for(const prop of reaction.value[dynamic]){
			const {peeledPropArray, paramsName} = peelPropsStringToAccessor(prop);
			for (let i = 0; i < peeledPropArray.length; i++) {
				if(i === peeledPropArray.length - 1){
					params[paramsName] = accessor[peeledPropArray[i]];
				} else {
					accessor = accessor[peeledPropArray[i]];
				}
			}
		}
		data[dynamic](params);
	}
};

export const processReaction = (stamp: {seed: string, time: number}, reactions:Object, data: Object):Object => {

	for (const reaction of reactions) {
		switch (reaction.type) {
			case REACTION.ADD:
				data[reaction.attribute] += reaction.value;
				break;
			case REACTION.MAYBE_ADD:
				if(checkChance(data, stamp, reaction)){
					data[reaction.attribute] += reaction.value;
				}
				break;
			case REACTION.SET:
				data[reaction.attribute] = reaction.value;
				break;
			case REACTION.MAYBE_SET:
				if(checkChance(data, stamp, reaction)){
					data[reaction.attribute] = reaction.value;
				}
				break;
			case REACTION.DYNAMIC:
				if(checkChance(data, stamp, reaction)){
					dynamicReact(data, reaction, stamp);
				}
				break;
		}
	}
	return data;
};
