const path = require('path');

module.exports = {
	entry: './script/devForQin.js',
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
					presets: [
						[
							'@babel/preset-env',
							{
								useBuiltIns: 'usage',
							},
						],
						'@babel/preset-flow',
					],
					plugins: [
						require('@babel/plugin-proposal-class-properties'),
						require('@babel/plugin-proposal-object-rest-spread'),
					],
				},
			},
		],
	},
};
