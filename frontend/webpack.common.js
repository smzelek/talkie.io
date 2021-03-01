const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: './frontend/src/app.tsx',
    output: {
        path: path.resolve('dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
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
            inject: 'body'
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