var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = function(env) {
    return {
        context: path.join(__dirname, 'src'),
        entry: './index',
        output: {
            filename: 'react-scrollable.js',
            path: path.join(__dirname, 'dist'),
            library: 'ReactScrollable',
            libraryTarget: 'umd'
        },
        externals: [
            'react',
            'react-dom',
            'prop-types'
        ],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: path.join(__dirname, 'node_modules'),
                    use: ['babel-loader', 'eslint-loader']
                },
                {
                    test: /\.css$/,
                    exclude: path.join(__dirname, 'node_modules'),
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                }
            ]
        },

        resolve: {
            extensions: ['.js', '.jsx']
        },

        devtool: env.development ? 'source-map' : false,

        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            historyApiFallback: true,
            port: 3001
        },

        plugins: [
            new ExtractTextPlugin('[name].css'),
            new UglifyJsPlugin()
        ]
    }
}
