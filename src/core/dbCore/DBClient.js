//@flow

import PouchDB from 'pouchdb';

import DBError from './DBError';

type DBClientPropsType = {
	name: string;
}

class DBClient {

	_db: PouchDB;

	constructor(props:DBClientPropsType){
		this._db = new PouchDB(props.name);

		this._db.get('ityrealGray@gmail.com')
			.then((doc) => {
				console.log('doc', doc);
			})
			.catch((e) => {
				console.error(new DBError(e));
			});
		//
		// db.changes().on('change', function() {
		//     console.log('Changes');
		// });
		//
		//db.replicate.to('qin');
	}
}

export default DBClient;