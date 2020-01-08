'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const path = require('path');

const env = process.env.NODE_ENV;
const isDevMode = env == 'development';
const alias = require('./alias.js');

function getBaseConfiguration(options) {
    return {
        resolve: {
            modules: [
                alias['src'],
                alias['node_modules']
            ],
            alias: {
                scripts: alias['scripts'],
                utils: alias['utils'],
                services: alias['services'],
                app: alias['app']
            }
        },
        entry: {
            'app': 'app.js'
        },
        output: {
            path: alias['dist'],
            publicPath: '/app-monitor-static/'
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    reactBase: {
                        name: 'reactBase',
                        test: (module) => {
                            return /react|redux|prop-types/.test(module.context);
                        },
                        chunks: 'initial',
                        priority: 10,
                    },
                    reactDom: {
                        name: 'reactDom',
                        test: (module) => {
                            return /react-dom/.test(module.context);
                        },
                        chunks: 'initial',
                        priority: 15,
                    },
                    moment: {
                        name: 'moment',
                        test: (module) => {
                            return /moment/.test(module.context);
                        },
                        chunks: 'initial',
                        priority: 10,
                    },
                   "@antd": {
                        name: '@antd',
                        test: (module) => {
                            return /@ant-design/.test(module.context);
                        },
                        chunks: 'initial',
                        priority: 10,
                    },
                    antd: {
                        name: 'antd',
                        test: (module) => {
                            return /antd/.test(module.context);
                        },
                        chunks: 'initial',
                        priority: 15,
                    },
                    common: {
                        name: 'common',
                        chunks: 'initial',
                        priority: 2,
                        minChunks: 2
                    },
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(alias['src'], 'index.html')
            }),
            new cleanWebpackPlugin([
                'scripts'
            ], {
                root: alias['dist'],
                verbose: true
            }),
            new HardSourceWebpackPlugin()
        ],
        externals: {
            jquery: "jQuery"
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceMap: true,
                        plugins: [
                            "add-module-exports",
                            ['import', { libraryName: "antd", style: 'css' }]
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/,
                use: ["file-loader?name=[name].[ext]"]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader']
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            camelCase: 'dashesOnly',
                            importLoaders: 2,
                            sourceMap: isDevMode
                        }
                    },
                    'postcss-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                use: ['eslint-loader'],
                exclude: [/node_modules/],
                enforce: 'pre'
            }]
        }
    };
}

module.exports = getBaseConfiguration;