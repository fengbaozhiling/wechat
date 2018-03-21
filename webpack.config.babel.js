
import { resolve } from 'path';
const webpack = require('webpack'); // 用于访问内置插件
import { DefinePlugin, EnvironmentPlugin, IgnorePlugin, optimize } from 'webpack';
import WXAppWebpackPlugin, { Targets } from 'wxapp-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';

const CopyWebpackPlugin = require('copy-webpack-plugin')
//const FlowWebpackPlugin = require('flow-webpack-plugin')

const { NODE_ENV, LINT, NO_LINT } = process.env;
const isDev = NODE_ENV !== 'production';
const shouldLint = false ; //(!isDev || (!!LINT && LINT !== 'false')) && !NO_LINT


const relativeFileLoader = (ext = '[ext]') => [
	{
		loader: 'file-loader',
		options: {
			publicPath: '',
			useRelativePath: true,
			name: `[name].${ext}`,
			emitFile: false,
		},
	},
	{
		loader: 'file-loader',
		options: {
			publicPath: '',
			context: resolve('src'),
			name: `[path][name].${ext}`,
		},
	},
];
export default (env = {}) => {
	return {
		entry: {
			app: [
				'./polyfill.js',
				'./src/config.'+ (isDev ? 'dev' : 'prod')+'.js',
				'./src/app.js',
			],
		},
		output: {
			filename: '[name].js',
			publicPath: '/',
			path: resolve('dist'),
		},
		target: Targets['Wechat'],

		module: {
			rules: [
				{
					test: /\.js$/,
					include: /src/,
					exclude: /node_modules/,
					use: [
						'babel-loader',
						shouldLint && 'eslint-loader',
					].filter(Boolean)
				},
				{
					test: /\.wxs$/,
					include: /src/,
					exclude: /node_modules/,
					use: [
						...relativeFileLoader(),
						'babel-loader',
						shouldLint && 'eslint-loader',
					].filter(Boolean),
				},
				{
					test: /\.scss$/,
					include: /src/,
					use: [
						...relativeFileLoader('wxss'),
						{
							loader: 'sass-loader',
							options: {
								includePaths: [
									resolve('src', 'styles'),
									resolve('src'),
								],
							},
						},
					],
				},
				{
					test: /\.(json|png|jpg|gif|wxss)$/,
					include: /src/,
					use: relativeFileLoader(),
				},
				{
					test: /\.wxml$/,
					include: resolve('src'),
					use: [
						...relativeFileLoader('wxml'),
						{
							loader: 'bgwxml-loader',
							options: {
								root: resolve('src'),
							},
						},
					],
				},
			],
		},
		plugins: [
			new EnvironmentPlugin({
				NODE_ENV: 'development',
			}),
			new DefinePlugin({
				__DEV__: isDev,
				wx: 'wx',
			}),
			//new FlowWebpackPlugin(),
			new CopyWebpackPlugin([{
				from: __dirname + '/src/project.config.json',
				ignore: ['**/**.js', '**/**.xml'],
				to: __dirname + '/dist'
			  }
			]),
			new WXAppWebpackPlugin({
				clear: !isDev,
			}),
			new optimize.ModuleConcatenationPlugin(),
			new IgnorePlugin(/vertx/)
		].filter(Boolean),
		devtool: isDev ? 'source-map' : false,
		resolve: {
			extensions: ['.js', '.jsx'],
			modules: [ 'node_modules', 'src'],
			unsafeCache: false
		},
		watchOptions: {
			ignored: /dist|manifest/,
			aggregateTimeout: 300,
		},
	};
};
