/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({path: process.cwd() +'/.env'});
const path = require('path');
const withSourceMaps = require('@zeit/next-source-maps');
const webpack = require('webpack');

module.exports = withSourceMaps({
	typescript: {
		ignoreDevErrors: true,
		ignoreBuildErrors: true,
	},
	webpack(config, {isServer, dev}) {
		return config;
	},
});
