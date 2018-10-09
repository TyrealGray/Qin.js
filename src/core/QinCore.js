//@flow

import type QinSandBox from './QinSandBox';

export default class QinCore {

	_sandBox: QinSandBox | null;

	constructor(props: any) {
		this._sandBox = null;
	}

	setSandBox(sandBox: QinSandBox){
		this._sandBox = sandBox;
	}

}