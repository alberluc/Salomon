const path = require('path');
const webpack = require('webpack');

let config = {
    entry: {
        app : './assets/js/app.js'
    },
    output: {
        path: path.resolve('./public/js'),
        filename: '[name].js'
    },
    watch: true,
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
                options: {
                    removeTags: true,
                    removingTags: ['title', 'desc']
                }
            }
        ]
    }
};

module.exports = config;