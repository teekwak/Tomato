const path = require('path');

module.exports = {
	devtool: 'eval',
	context: path.join(__dirname, 'views'),
	entry: [
		'./entry.js'
	],
	output: {
		path: path.join(__dirname, 'views'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
				],
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
			}
		],
	},
	resolve: {
		modules: [
			path.join(__dirname, 'node_modules'),
		],
	}
};
