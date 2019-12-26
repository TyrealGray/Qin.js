//@flow

import factor from './factor';

class Shuo {
	_content: Object;
	_rule: Object;

	constructor(props: any) {
		this._content = {
			characterInfo: {
				dataSet: [],
			},
			terrainInfo:{
				dataSet: [],
			},
		};
		this._rule = null;
	}

	init(): Promise<void> {
		return new Promise((resolve) => {
			//TODO decode factor object to content
			this._rule = factor.rules ;
			factor.characters.forEach((c) => {
				this._content.characterInfo.dataSet.push({
					name: c.displayName,
					coordinates: c.coordinates,
				});
			});

			factor.terrains.forEach((t) => {
				this._content.terrainInfo.dataSet.push(t.attribute);
			});
			resolve();
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

	reload(): Promise<void> {
		return this.init();
	}
}

export default Shuo;
