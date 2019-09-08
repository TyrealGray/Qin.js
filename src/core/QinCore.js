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

	async start(): Promise<void> {
		await this._sandBox.start();
	}

	async stop(): Promise<void> {
		await this._sandBox.stop();
	}
}

export default QinCore;