const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/*const postcssPresetEnv = require('postcss-preset-env');*/
const webpack = require('webpack');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    target: 'web',
    mode: 'development',
    devtool: 'source-map', //eval-sourcemap, inline-source-map, eval, eval-cheap-source-map, source-map, inline-cheap-source-map
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        overlay: true,
        hot: false,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                  { loader: MiniCssExtractPlugin.loader },
                  {
                    loader: 'css-loader',
                    options: {
                        url: false,
                        sourceMap: true
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      sourceMap: true
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true
                    }
                  }
                ]
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // filename: "[name].[hash].css"
            filename: "css/style.[hash].css"
        }),
        new CopyWebpackPlugin(
            { 
                patterns: [
                    { from: './src/img', to: './img' },
                    // { from: './src/fonts', to: './dist/fonts' }
                ]
            }
        ),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
}