var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: {
        dashboard: './resources/assets/js/controllers/dashboard',
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
        modulesDirectories: [
            path.resolve('./node_modules'),
            "bower_components",
            path.resolve('./resources/assets/assets/plugins'),
            path.resolve('./public/pages/js'),
        ],
        alias: {},
    },
    resolveLoader: {
        root: [
            path.resolve('./node_modules'),
        ]
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
    plugins: [
        // Map $ and jQuery to `require('jquery')`
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ],
};