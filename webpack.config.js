var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: {
        // Put your webpack entries here
    },
    output: {
        path:          'public/js',
        filename:      '[name].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath:    'public/js',
    },
    resolve: {
        root: [
            path.resolve('./resources/assets/js')
        ],
        alias: {},
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.jsx?$/,
                include: /(resources\/assets\/js)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
        ],
    },
    plugins: [],
};