//@flow

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

import DBError from './DBError';

type DBClientPropsType = {
	name: string,
};

class DBClient {
	_db: PouchDB;
	_name: string;

	constructor(props: DBClientPropsType) {
		this._name = props.name;
		this._db = new (PouchDB.plugin(PouchDBFind))(props.name);
	}

	async _get(name: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this._db
				.get(name)
				.then((doc) => {
					return resolve(doc);
				})
				.catch((e) => {
					return reject(new DBError(e));
				});
		});
	}

	async found(value): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this._get(value);
				return resolve(response);
			} catch (e) {
				if (e.name === 'DBError' && e.status === 404) {
					return resolve(null);
				}

				return reject(e);
			}
		});
	}

	async update(value, content): Promise<any> {
		return new Promise(async (resolve) => {
			let doc = await this.found(value);
			const updateContent = doc
				? {
						_rev: doc._rev,
						...content,
				  }
				: content;

			const response = await this._db.put({
				_id: value,
				...updateContent,
			});

			return resolve(response);
		});
	}
}

export default DBClient;
