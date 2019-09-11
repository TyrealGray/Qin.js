//@flow

import * as factor from './factor.json';

class Shuo {
	_content: Object;
	_rule: Object;

	constructor(props: any) {
		this._content = {
			characterInfo: {
				characters: [],
			},
		};
		this._rule = null;
	}

	init(): Promise<void> {
		return new Promise((resolve) => {
			//TODO decode factor object to content
			this._rule = { ...factor };
			this._rule.characters.forEach((c) => {
				this._content.characterInfo.characters.push({
					name: c.displayName,
					coordinates: c.coordinates,
				});
			});
			resolve();
		});
	}

	loadExtra(extra: Object): void {
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
