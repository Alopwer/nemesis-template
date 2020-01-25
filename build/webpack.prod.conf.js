const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require("imagemin-webpack");

const prodConfig = merge(baseConfig, {
    mode: 'production',
    optimization: {
        ...baseConfig.optimization,
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new UglifyJsPlugin({
                test: /\.js($|\?)/i
            })
        ]
    },
    plugins: [
        ...baseConfig.plugins,
        new ImageminPlugin({
            imageminOptions: {
                plugins: [
                    ["optipng", { optimizationLevel: 5 }]
                ]
            }
        }),
    ]
})

module.exports = new Promise((res, rej) => {
    res(prodConfig)
})