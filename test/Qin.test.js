import { Qin } from '../src/Qin';

describe('Qin.js', () => {
	test('should able to start core', () => {
		const qin = new Qin({debugging:false});

		qin.createSandbox({name:'test'}).then(() => {
			qin.start().then(() => {
				qin.stop();
				expect(qin._core.start).toHaveBeenCalled();
				expect(qin._core).toBeDefined();

			});
		});
	});
});