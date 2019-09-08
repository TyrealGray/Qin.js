//@flow

import QinSandbox from './QinSandbox';

type QinCorePropsType = {
	debugging?: boolean;
}

class QinCore {

	_sandBox: QinSandbox;

	constructor(props: QinCorePropsType) {
		this._sandBox = new QinSandbox({debugging: props.debugging || false});
	}

	setSandBox(sandBox: QinSandbox): void {
		this._sandBox = sandBox;
	}

	async desertify(name: string): Promise<void> {
		return await this._sandBox.init(name);
	}
}

export default QinCore;