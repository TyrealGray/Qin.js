//@flow
import { shouContent } from '../reduxCore/reducers';
import { monotonicFactory } from 'ulid';
import randomSeed from './randomSeed';

import factor from './factor';

class Shuo {
	_content: Object;
	_rule: Object;

	constructor(props: any) {
		this._content = shouContent;
		this._rule = null;
	}

	init(): void {
		const ulid = monotonicFactory();
		//TODO decode factor object to content
		this._rule = factor.rules;

		this._content.gameInfo.seed = randomSeed.getSeed();

		// factor.characters.forEach((c) => {
		// 	this._content.characterInfo.dataSet.push({
		// 		qinId: ulid(),
		// 		type: 'character',
		// 		name: c.displayName,
		// 		coordinates: c.coordinates,
		// 	});
		// });

		factor.terrains.forEach((t) => {
			this._content.terrainInfo.dataSet.push({
				...t.attribute,
				eventMap: t.eventMap,
				qinId: t.attribute.qinId || ulid(),
			});
		});
	}

	loadExtra(extra: Object): void {
		// TODO: defined override process
		this._rule = {
			...this._rule,
			...extra,
		};
	}

	getRule(): any {
		return this._rule;
	}

	getContent(): any {
		return this._content;
	}

	reload(): void {
		this.init();
	}
}

export default Shuo;
