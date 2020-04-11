import QinCore from './src/core/QinCore';

const core = new QinCore({debugging:true});
core.desertify('qindb').then(async ()=>{
	await core.start();
});