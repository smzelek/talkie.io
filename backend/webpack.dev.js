const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: './backend/main.ts',
    output: {
        path: path.resolve('backend/dist'),
        filename: 'server.js',
    },
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader'],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CompressionPlugin({
            test: /.*.js$/,
        })
    ],
    mode: 'development',
    devtool: 'inline-source-map',
}