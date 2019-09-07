//@flow

import * as factor from './factor.json';

class Shuo {
	_content: any;
	_rule: any;

	constructor(props: any) {
		this._content = null;
		this._rule = null;
	}

	init(): Promise<void> {
		return new Promise((resolve) => {
			//TODO decode factor object to content
			this._content = { ...factor };
			this._rule = { ...factor };
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