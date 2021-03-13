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

		factor.npcs.forEach((n,i) => {
			this._content.npcInfo.dataSet.push({
				...n.attribute,
				index: i,
				eventMap: n.eventMap,
				dynamicFunction: n.dynamicFunction,
				qinId: n.attribute.qinId || ulid(),
			});
		});

		factor.terrains.forEach((t,i) => {
			this._content.terrainInfo.dataSet.push({
				...t.attribute,
				index: i,
				eventMap: t.eventMap,
				dynamicFunction: t.dynamicFunction,
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
