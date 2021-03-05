const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true, // node_modules/inversify-express-utils relies on class name for @controller() decorator
                },
                parallel: true,
                sourceMap: true
            })
        ]
    }
});
