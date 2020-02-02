/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({path: process.cwd() +'/.env'});
const path = require('path');
const withSourceMaps = require('@zeit/next-source-maps');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const optimizeCssPlugin = new OptimizeCSSAssetsPlugin({
	assetNameRegExp: /\.css$/g,
});

const staticFolderName = process.env.STATIC_FOLDER;

function isStaticFolder(filePath) {
	const root = path.relative(path.resolve(__dirname, '..'), filePath).split(path.sep)[0];
	return root === staticFolderName;
}

module.exports = withSourceMaps({
	typescript: {
		ignoreDevErrors: true,
		ignoreBuildErrors: true,
	},
	webpack(config, {isServer, dev}) {
		if (!isServer) {
			config.optimization.splitChunks.cacheGroups.styles = {
				name: 'styles',
				test(module) {
					if (module.type !== 'css/extract-css-chunks') return false;
					/* remove static folder from chunk */
					const filePath = module.issuer.resource;
					return !isStaticFolder(filePath);
				},
				chunks: 'all',
				enforce: true,
			};
		}

		config.module.rules.push({
			test: /\.css$/,
			oneOf: [
				{
					test: filePath => isStaticFolder(filePath),
					use: [
						{
							loader: ExtractCssChunks.loader,
							options: {
								hot: dev,
								reloadAll: true,
							},
						},
						{
							loader: 'css-loader',
							options: {
								modules: false,
								sourceMap: dev,
								importLoaders: 0,
							},
						},
					],
				},
				{
					use: [
						{
							loader: ExtractCssChunks.loader,
							options: {
								hot: dev,
								reloadAll: true,
							},
						},
						{
							loader: 'css-loader',
							options: {
								modules: true,
								sourceMap: dev,
								importLoaders: 1,
								camelCase: 'only',
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
						},
						{
							loader: 'postcss-loader',
							options: {},
						},
						{
							loader: 'sass-loader',
							options: {},
						},
					],
				},
			],
		});

		config.plugins.push(
			new ExtractCssChunks({
				filename: dev ? `${staticFolderName}/chunks/[name].css` : `${staticFolderName}/chunks/[name].[contenthash:8].css`,
				chunkFilename: dev
					? `${staticFolderName}/chunks/[name].chunk.css`
					: `${staticFolderName}/chunks/[name].[contenthash:8].chunk.css`,
				hot: dev,
				ignoreOrder: true,
			}),
		);

		if (!config.plugins.includes(optimizeCssPlugin)) config.plugins.push(optimizeCssPlugin);

		return config;
	},
});
