const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");

// const critical = require("critical");
// const nodeExternals = require('webpack-node-externals');
// const WebpackMd5Hash = require("webpack-md5-hash");

// critical.generate({
// 	/* The path of the Webpack bundle */
// 	base: path.join(path.resolve(__dirname, 'dist')),
// 	src: 'index.html',
// 	dest: 'index.html',
// 	inline: true,
// 	extract: true,
// 	// /* iPhone 6 dimensions, use whatever you like*/
// 	// width: 375,
// 	// height: 565,
//
// 	/* Ensure that bundled JS file is called */
// 	penthouse: {
// 		blockJSRequests: false,
// 	}
// });

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
			new HtmlCriticalPlugin({
				base: path.join(path.resolve(__dirname), 'dist/'),
				src: 'index.html',
				dest: 'index.html',
				inline: true,
				minify: true,
				extract: true,
				width: 375,
				height: 565,
				penthouse: {
					blockJSRequests: false,
				}
			})
		],
	}
};
