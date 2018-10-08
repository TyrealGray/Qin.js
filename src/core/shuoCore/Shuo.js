//@flow

import * as shuo from './shuoRule.json';

export default class Shuo {
	_startPoint: null | { x: number, y: number };

	constructor(props: any) {
		this._startPoint = null;
		this._init();
	}

	_init() {
		this._startPoint = shuo.world.startingPoint;
	}
}
