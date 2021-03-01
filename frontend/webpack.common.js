const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry:
    {
        login: './src/pages/login.ts',
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['ts-loader']
            },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './www/index.html',
            filename: 'index.html',
            inject: 'body',
            chunks: ['bio']
        }),
        new HtmlWebpackPlugin({
            template: './www/blog/index.html',
            filename: 'blog/index.html',
            inject: 'body',
            chunks: ['blog']
        }),
        new HtmlWebpackPlugin({
            template: './www/apps/index.html',
            filename: 'apps/index.html',
            inject: 'body',
            chunks: ['apps']
        }),
        new HtmlWebpackPlugin({
            template: './www/apps/tic-metac-toe/index.html',
            filename: 'apps/tic-metac-toe/index.html',
            inject: 'body',
            chunks: ['ticMetacToe']
        }),
        new HtmlWebpackPlugin({
            template: './www/blog/why-our-company-needed-web-components/index.html',
            filename: 'blog/why-our-company-needed-web-components/index.html',
            inject: 'body',
            chunks: ['whyOurCompanyWCs']
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'assets', to: 'assets' }
            ]
        }),
        new CompressionPlugin({
            test: /.*.js$/,
        })
    ]
}