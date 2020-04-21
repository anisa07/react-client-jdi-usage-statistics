const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env, argv) {
	return {
		devtool: argv.mode === 'development' ? 'inline-source-map' : false,
		entry: path.resolve(__dirname, 'src/index'),
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.js$|jsx/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader"
					}
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: "html-loader"
						}
					]
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader',
					],
				}
			]
		},
		devServer: {
			contentBase:  path.resolve(__dirname, 'dist'),
			port: 9000
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: "./src/index.html",
				filename: "./index.html"
			})
		]
	}
};
