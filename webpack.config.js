const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = 'development';

const entry = {
    app: './index.js'
}

const output = {
    publicPath: '',
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
}

const optimization = {
    splitChunks: {
        automaticNameDelimiter: '.',
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all'
            },
            app: {
                test: /[\\/]src[\\/]/,
                name: 'app',
                chunks: 'all'
            }
        }
    }
}

const modules = {
    rules: [
        {
            test: /\.js/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader'
            }]
        },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: [
                {
                    loader: 'file-loader',
                    options: { name: '/fonts/[name].[ext]' }
                }
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '/images/[name].[ext]',
                        esModule: false
                    }
                }
            ]
        }
    ]
}

const resolve = {
    // alias: {
    //     vue: 'vue/dist/vue.min.js'
    // }
}

const plugins = [
    new MiniCssExtractPlugin({
        filename: 'css/[name].css'
    }),
    new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
            preset: ['default',
                {
                    discardComments: { removeAll: true }
                }
            ]
        }
    }),
    new UglifyJsPlugin({
        uglifyOptions: {
            output: {
                comments: false,
            }
        }
    }),
    new MinifyPlugin(),
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: 'Front-End Boilerplate',
        minify: {
            collapseWhitespace: true
        }
    })
]

module.exports = {
    mode: mode,
    optimization: optimization,
    entry: entry,
    output: output,
    module: modules,
    resolve: resolve,
    plugins: plugins
};
