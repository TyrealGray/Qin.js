//@flow

import * as shuo from './shuoRule.json';

class Shuo {
	_rule: null | { startingPoint: { x: number, y: number } };

	constructor(props: any) {
		this._rule = null;
	}

	init(): Promise<void> {
		return new Promise((resolve) => {
			this._rule = { startingPoint: shuo.world.startingPoint };
			resolve();
		});
	}

	loadExtra(extra: Object): void {
		this._rule = {
			...this._rule,
			...extra,
		};
	}

	reload(): Promise<void> {
		return this.init();
	}
}

export default Shuo;