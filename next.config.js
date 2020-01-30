const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withSourceMaps = require('@zeit/next-source-maps');
const webpack = require('webpack');

module.exports = withCSS({
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: '[name]__[local]___[hash:base64:5]',
	},
	webpack(config, options) {
		config.module.rules.push({
			test: /\.css$/,
			use: ['postcss-loader', 'sass-loader'],
		});
		return config;
	},
});
