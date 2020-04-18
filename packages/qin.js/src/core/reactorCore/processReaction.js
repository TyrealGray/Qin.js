//@flow
import Perlin from 'perlin.js';
import { REACTION } from './shuoCore/reactionType';
import randomSeed from './shuoCore/randomSeed';

const checkChanceByStamp = (data, stamp, reaction):boolean => {
	randomSeed.setSeed(stamp.seed);
	const randomBySeed = randomSeed.random();
	randomSeed.setSeed(data.qinId);
	const randomNumber = randomSeed.random();
	Perlin.seed(randomNumber);
	const noise = Perlin.perlin3(randomBySeed, randomNumber, stamp.time.toFixed(2));

	const chance = ((noise + 1.0) / 2.0).toFixed(2);

	return (chance <= reaction.rate);
};

export const processReaction = (stamp: {seed: string, time: number}, reactions:Object, data: Object):Object => {

	for (const reaction of reactions) {
		switch (reaction.type) {
			case REACTION.ADD:
				data[reaction.attribute] += reaction.value;
				break;
			case REACTION.MAYBE_ADD:
				if(checkChanceByStamp(data, stamp, reaction)){
					data[reaction.attribute] += reaction.value;
				}
				break;
		}
	}
	return data;
};