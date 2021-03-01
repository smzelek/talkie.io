const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry:
    {
        login: './frontend/src/pages/login.tsx',
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: ['ts-loader'],
                exclude: /frontend\/node_modules/
            },
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/www/index.html',
            filename: 'index.html',
            inject: 'body',
            chunks: ['root']
        }),
        // new HtmlWebpackPlugin({
        //     template: './www/chat/index.html',
        //     filename: 'chat/index.html',
        //     inject: 'body',
        //     chunks: ['chat']
        // }),
        new HtmlWebpackPlugin({
            template: './frontend/www/login/index.html',
            filename: 'login/index.html',
            inject: 'body',
            chunks: ['login']
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: './frontend/assets', to: 'assets' }
            ]
        }),
        new CompressionPlugin({
            test: /.*.js$/,
        })
    ]
}