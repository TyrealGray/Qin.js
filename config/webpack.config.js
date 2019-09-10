const path = require('path');

module.exports = {
	entry: './script/devQin.js',
	devtool: 'inline-source-map',
	mode: 'development',
	output: {
		filename: 'qin.js',
		path: path.resolve(__dirname, '../'),
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								useBuiltIns: 'usage',
								corejs: '3',
							},
						],
						'@babel/preset-flow',
					],
					plugins: [
						'@babel/plugin-proposal-class-properties',
						'@babel/plugin-proposal-object-rest-spread',
						'@babel/plugin-syntax-dynamic-import',
					],
				},
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
				type: 'javascript/auto',
			},
		],
	},
};
