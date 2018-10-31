//@flow

import QinSandbox from './QinSandbox';

type QinCorePropsType = {
	isDebugRedux?: boolean;
}

class QinCore {

	_sandBox: QinSandbox;

	constructor(props: QinCorePropsType) {
		this._sandBox = new QinSandbox({isDebugRedux: props.isDebugRedux || false});
	}

	setSandBox(sandBox: QinSandbox): void {
		this._sandBox = sandBox;
	}

	async desertify(name: string): Promise<void> {
		return await this._sandBox.init(name);
	}
}

export default QinCore;