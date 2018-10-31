//@flow

import Shuo from '../shuoCore/Shuo';
import DBClient from '../dbCore/DBClient';

class Reactor {
	_name: string;
	_shuo: Shuo;
	_dbCore: DBClient;

	constructor(props: { name: string }) {
		this._name = props.name;
		this._shuo = new Shuo();
	}

	async init(): Promise<void> {
		try {
			await this._initShuo();
			this._initPouchDB();

			if (await this._isDBEmpty()) {
				this._initReactorChain();
			}
		} catch (e) {
			console.error(e);
		}
	}

	_initReactorChain(): void {
		console.log('init reactor chain');
	}

	async _initShuo(): Promise<void> {
		await this._shuo.init();
	}

	_initPouchDB(): void {
		this._dbCore = new DBClient({ name: `QINJS_${this._name}_DB` });
	}

	async _isDBEmpty(): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				await this._dbCore.get('QINJS');
				return resolve(false);
			} catch (e) {
				if (e.name === 'DBError' && e.status === 404) {
					return resolve(true);
				}

				return reject(e);
			}
		});
	}

	loadExtra(extra: Object) {
		this._shuo.loadExtra(extra);
	}

}

export default Reactor;