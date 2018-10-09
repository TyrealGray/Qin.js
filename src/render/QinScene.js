//@flow

import type QinRenderer from './QinRenderer';

export default class QinScene {
	_renderer: QinRenderer | null;

	constructor(props: any) {
		this._renderer = null;
	}

	_setRenderer(renderer: QinRenderer) {
		this._renderer = renderer;
	}

	onFinish() {

	}
}
