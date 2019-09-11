import { Qin } from '../src/Qin';

const qin = new Qin({ debugging: true });
qin.createSandbox({ name: 'qindb' }).then(() => {
	qin.start();
});
window.qin = qin;
