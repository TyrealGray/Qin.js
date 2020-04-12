import { Qin } from './src/Qin';

const qin = new Qin();
qin.createSandbox({ name: 'qindb' }).then(async () => {
	await qin.start();
});