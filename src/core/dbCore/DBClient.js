//@flow

import PouchDB from 'pouchdb';
import * as PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

import DBError from './DBError';

type DBClientPropsType = {
	name: string,
};

class DBClient {
	_db: PouchDB;
	_name: string;

	constructor(props: DBClientPropsType) {
		this._name = props.name;
		this._db = new PouchDB(props.name);
	}

	async get(name: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this._db.get(name).then((doc)=>{
				return resolve(doc);
			}).catch((e) => {
				return reject(new DBError(e));
			});
		});
	}
}

export default DBClient;
