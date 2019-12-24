import expect from 'expect.js';
import { Qin } from '../src/Qin';

describe('Test begin', () => {
	it('should core init', () => {
		const qin = new Qin({debugging:false});
		expect(qin._core).to.not.equal(undefined);
	});
});