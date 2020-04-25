const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const nodeExternals = require('webpack-node-externals');
// const WebpackMd5Hash = require("webpack-md5-hash");

module.exports = function (env, argv) {
	return {
		devtool: argv.mode === 'development' ? 'inline-source-map' : false,
		entry: {
			bundle: argv.mode === 'development' ?  path.resolve(__dirname, 'src/client') : path.resolve(__dirname, 'src/index')
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js',
			publicPath: '/',
		},
		target: argv.mode === 'development' ? "node" : "web", // update 23.12.2018
		// externals: [nodeExternals()], // update 23.12.2018
		module: {
			rules: [
				{
					test: /\.jsx?$/,
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
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'fonts/'
							}
						}
					]
				}
			]
		},
		devServer: {
			contentBase:  path.resolve(__dirname, 'dist'),
			port: 9000,
			historyApiFallback: true
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "style.css"
			}),
			new HtmlWebpackPlugin({
				template: "./src/index.html",
				filename: "./index.html"
			}),
			// new WebpackMd5Hash()
		]
	}
};
