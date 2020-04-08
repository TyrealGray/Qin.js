import { Qin } from '../src/Qin';

describe('Test begin', () => {
	test('should core init', () => {
		const qin = new Qin({debugging:false});
		expect(qin._core).toBeDefined();
	});
});