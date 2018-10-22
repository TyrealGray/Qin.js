const path = require('path');

module.exports = {
	entry: ['babel-polyfill','./script/devForQin.js'],
	devtool: 'inline-source-map',
	mode: 'development',
	output: {
		filename: 'devQin.js',
		path: path.resolve(__dirname, '../'),
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: {
					presets: ['env'],
					plugins: [
						require('babel-plugin-transform-object-rest-spread'),
						require('babel-plugin-transform-class-properties'),
					],
				},
			},
		],
	},
};