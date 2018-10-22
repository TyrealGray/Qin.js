import Qin from '../src/Qin';

const qin = new Qin({element: document.getElementById('CanvasContainer'), width: 800, height: 600});
qin.createSandbox({name:'qindb'}).then(()=>{
	qin.run();
});