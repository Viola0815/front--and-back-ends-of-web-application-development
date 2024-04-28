const path = require('path');
module.exports = {
	mode: 'development',
	entry: './src/Controller/appManager.js',
	devtool: 'source-map',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'public'),
	},
	module: {
		rules: [ 
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {presets: ['@babel/preset-env']},
				}

			}
		],
	},

};