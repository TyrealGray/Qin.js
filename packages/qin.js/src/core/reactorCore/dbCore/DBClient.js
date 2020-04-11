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
		this._db = new Datastore({ filename: `./${this._name}`, autoload: true });
	}

	async _get(query: Object): Promise<any> {
		return new Promise((resolve, reject) => {
			this._db.find(query, (err, docs)=> {
				if(err){
					return reject(err);
				}

				return resolve(docs);
			});
		});
	}

	async _getOne(query: Object): Promise<any> {
		return new Promise((resolve, reject) => {
			this._db.findOne(query, (err, docs)=> {
				if(err){
					return reject(err);
				}

				return resolve(docs);
			});
		});
	}

	async _upsert(query: Object, content: Object): Promise<any> {
		return new Promise((resolve, reject) => {
			this._db.update(query, { $set: content}, { upsert: true }, function (err, numReplaced, affectedDocuments) {
				if(err){
					return reject(err);
				}

				return resolve(affectedDocuments);
			});
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
