//@flow
import Perlin from 'Perlin.js';
import { REACTION } from './shuoCore/reactionType';
import randomSeed from './shuoCore/randomSeed';

const checkChanceByStamp = (stamp, reaction):boolean => {
	randomSeed.setSeed(stamp.seed);
	const seedNumber = randomSeed.getSeedNumber();
	Perlin.seed(seedNumber);
	const noise = Perlin.simplex2(reaction.rate[0] * stamp.time, reaction.rate[1] * stamp.time);
	console.log('seedNumber',seedNumber,'noise', noise, 'tick', stamp.time);

	return (noise > reaction.rate[0] && noise < reaction.rate[1]);
};

export const processReaction = (stamp: {seed: string, time: number}, reactions:Object, data: Object):Object => {

	for (const reaction of reactions) {
		switch (reaction.type) {
			case REACTION.ADD:
				data[reaction.attribute] += reaction.value;
				break;
			case REACTION.MAYBE_ADD:
				if(checkChanceByStamp(stamp, reaction)){
					data[reaction.props] += reaction.value;
				}
				break;
		}
	}
	return data;
};