const path = require('path');
const glob = require('glob')
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
      const parts = item.split('.');
      const name = parts[0];
      const extension = parts[1];
    return new HTMLWebpackPlugin({
        filename: `html/${name}.html`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        minify: {
            collapseWhitespace: process.env.NODE_ENV === 'production'
        }
    })
    })
}
const htmlPlugins = generateHtmlPlugins('../src/html')

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins: [
                '@babel/plugin-proposal-class-properties'
            ]
        }
    }]

    return loaders
}

const PATHS = {
    src: path.resolve(__dirname, '../src')
}

module.exports = {
    entry : ['babel-polyfill', '~src/js/index.js'],
    output : {
        filename : 'js/[name].[hash].js',
        path : path.resolve(__dirname, '../dist')
    },
    resolve: {
        alias: {
            '@images': path.resolve(__dirname, './assets/images'),
            '@fonts': path.resolve(__dirname, './assets/fonts'),
            '~src': path.resolve(__dirname, '../src'),
            '~node': path.resolve(__dirname, '../node_modules')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename : process.env.NODE_ENV === 'production' ? 'styles/[name].[contenthash].css' : 'styles/[name].css'
        }),
        new PurgecssPlugin({
          paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
          only: ['bundle']
        }),
        new CopyWebpackPlugin([
            {
                from: './src/assets',
                to: 'assets'
            }
        ])
    ].concat(htmlPlugins),
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    }, 
                        'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => ([
                                require('autoprefixer'),
                                require('cssnano')
                            ])
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: jsLoaders()
            },
            {
                test: /.(png|svg|jpg|gif)$/,
                use: [
                    { 
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images'
                        },
                    },
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts'
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all'
                },
            }
        }
    }
}