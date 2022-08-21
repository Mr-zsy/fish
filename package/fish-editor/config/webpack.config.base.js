const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const r = (url) => path.resolve(__dirname, '../', url);
/**
 * @type {import('webpack').Configuration
 */
const config = {
    entry: {
        index: r('./src/index.tsx')
    },
    output: {
        filename: 'index.js'
    },
    resolve: {
        alias: {},
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useCache: true,
                            transpileOnly: true
                        }
                    }
                ]
            },
          ],
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
              defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                reuseExistingChunk: true,
              },
              common: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                reuseExistingChunk: true,
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
              },
            },
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'Fish',
            template: r('./src/index.html'), // 源模板文件
            filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
            showErrors: true,
            inject: 'body',
            chunks: ['index', "common", "default", "defaultVendors"]
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
};

module.exports = {
    config, r
};