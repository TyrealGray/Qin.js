//@flow

import * as shuo from './shuoRule.json';

class Shuo {
	_content: any;

	constructor(props: any) {
		this._content = null;
	}

	init(): Promise<void> {
		return new Promise((resolve) => {
			this._content = { ...shuo };
			resolve();
		});
	}

	loadExtra(extra: Object): void {
		this._content = {
			...this._content,
			...extra,
		};
	}

	getContent(): any {
		return this._content;
	}

	reload(): Promise<void> {
		return this.init();
	}
}

export default Shuo;