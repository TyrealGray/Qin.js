//@flow

type CustomPouchErrorType = {
	docId: string;
	error: boolean;
	message: string;
	name: string;
	reason: string;
	status: number;
}

class DBError extends Error {
	constructor(props:CustomPouchErrorType){
		super(`{ docId: ${props.docId}, error: ${props.error.toString()},
		 message: ${props.message}, name: ${props.name}, 
		 reason: ${props.reason}, status: ${props.status} }`);
		this.name = this.constructor.name;
		this.message = props.message;
		this.status = props.status;
		Error.captureStackTrace(this);
	}
}

export default DBError;