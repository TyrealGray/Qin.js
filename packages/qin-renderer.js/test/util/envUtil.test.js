import {getRenderAssets} from '../../src/util/envUtil';

describe('envUtil', () => {
	test('should path inside node_modules',()=> {
		expect(getRenderAssets('')).toEqual('./node_modules/qin-renderer.js/assets/');
	});

	test('should path not inside node_modules',()=> {
		process.env.QIN_RENDERER = 'DEV';
		expect(getRenderAssets('')).toEqual('./assets/');
	});
});