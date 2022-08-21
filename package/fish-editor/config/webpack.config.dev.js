const path = require('path');
const { merge } = require('webpack-merge');
const {config: baseConfig, r} = require('./webpack.config.base.js');




/**
 * @type {import('webpack').Configuration
 */
const config = merge(baseConfig, {
    mode: 'development',
    devServer: {
        compress: true,
        open: true,
        port: 9000,
        historyApiFallback: true,
    },
});


module.exports = config;