//@flow
import Datastore from 'nedb';

type DBClientPropsType = {
	name: string,
};

class DBClient {
	_db: Datastore;
	_name: string;

	constructor(props: DBClientPropsType) {
		this._name = props.name;
		this._db = new Datastore({
			filename: `./${this._name}`,
			autoload: true,
		});
	}

	async _promiseDBQuery(
		dbCallback: (Object, (...arg: any) => any) => void,
		query: Object,
	): Promise<any> {
		return new Promise((resolve, reject) => {
			dbCallback(query, (err, docs) => {
				if (err) {
					return reject(err);
				}

				return resolve(docs);
			});
		});
	}

	async _get(query: Object): Promise<any> {
		return await this._promiseDBQuery((q, c) => this._db.find(q, c), query);
	}

	async _getOne(query: Object): Promise<any> {
		return await this._promiseDBQuery(
			(q, c) => this._db.findOne(q, c),
			query,
		);
	}

	async _upsert(query: Object, content: Object): Promise<any> {
		return new Promise((resolve, reject) => {
			this._db.update(
				query,
				{ $set: content },
				{ upsert: true },
				(err, numReplaced, affectedDocuments) => {
					if (err) {
						return reject(err);
					}

					return resolve(affectedDocuments);
				},
			);
		});
	}

	async query(query: Object): Promise<Object> {
		return await this._get(query);
	}

	async queryOne(query: Object): Promise<Object> {
		return await this._getOne(query);
	}

	async update(query: Object, content: Object): Promise<any> {
		return await this._upsert(query, content);
	}
}

export default DBClient;
