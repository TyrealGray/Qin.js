import {Qin} from 'qin.js';
import QinRenderer from '../src/render/QinRenderer';
import QinScene from '../src/render/QinScene';

process.env.QIN_RENDERER = 'DEV';

const qin = new Qin({debugging: true});

qin.createSandbox({name:'qindb'}).then(()=>{
	qin.start();
	const renderer = new QinRenderer({
		core: qin,
		element: document.getElementById('CanvasContainer'),
		width:800,
		height:600,
	});

	renderer.renderScene(new QinScene);
});