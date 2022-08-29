const path = require('path');
const { merge } = require('webpack-merge');
const {config: baseConfig, r} = require('./webpack.config.base.js');




/**
 * @type {import('webpack').Configuration
 */
const config = merge(baseConfig, {
    mode: 'prod',
    output: {
        filename: 'index.js',
        path: r('./dist'),
        publicPath: r('./dist/assets'),
        chunkFilename: '[name]-[chunkhash].js',
    },
});


module.exports = config;