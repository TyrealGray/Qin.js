import { Qin } from '../src/Qin';

describe('Qin.js', () => {
	test('should able to start core', () => {
		const qin = new Qin({debugging:false});

		const spyStart = jest.spyOn(qin._core, 'start');

		qin.createSandbox({name:'test'}).then(() => {
			qin.start().then(() => {
				qin.stop();
				expect(spyStart).toHaveBeenCalled();
				expect(qin._core).toBeDefined();
			});
		});
	});
});