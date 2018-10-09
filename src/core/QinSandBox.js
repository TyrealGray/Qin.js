//@flow

import Shuo from './shuoCore/Shuo';

export default class QinSandBox {
	_shuo: Shuo;

	constructor(props: any) {
		this._shuo = new Shuo();
	}

	async init(): Promise<void> {
		await this._initShuo();
	}

	async _initShuo() {
		await this._shuo.init();
	}

	loadExtra(extra: Object | null) {
		if (extra) {
			this._shuo.loadExtra(extra);
		}
	}

	async reload():Promise<void> {
		await this._shuo.reload();
	}
}