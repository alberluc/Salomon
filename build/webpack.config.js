const path = require('path');

let config = {
    entry: {
        app : './assets/js/app.js'
    },
    output: {
        path: path.resolve('./public/js'),
        filename: '[name].js'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    }
};

module.exports = config;