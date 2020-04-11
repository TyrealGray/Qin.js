const path = require('path');

module.exports = {
    entry: './script/dev.js',
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    sourceType: 'unambiguous',
                    presets: [
                        [
                            '@babel/preset-env',
                            {
								corejs: 3,
                                useBuiltIns: 'usage',
                            },
                        ],
                        '@babel/preset-flow',
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-object-rest-spread',
                    ],
                },
            },
        ],
    },
};
