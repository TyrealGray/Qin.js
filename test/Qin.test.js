import expect from 'expect.js';
import { Qin } from '../src/Qin';

describe('Test begin', () => {
	it('should be running', () => {
		const qin = new Qin({debugging:false});
		qin.start().then(()=>{
			qin.stop();
			expect(qin._core).to.not.equal(undefined);
		});
	});
});