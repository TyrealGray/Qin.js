import expect from 'expect.js';
import { Qin } from '../src/Qin';

describe('Test begin', () => {
	it('should be running', () => {
		const qin = new Qin({isDebugRedux:false});
		expect(qin.run()).to.be(0);
	});
});