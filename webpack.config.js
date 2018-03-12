const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (function config(env) {
  return {
    context: path.join(__dirname, 'src'),
    entry: './index',
    output: {
      filename: 'react-scrollx.js',
      path: path.join(__dirname, 'dist'),
      library: 'ReactScrollx',
      libraryTarget: 'umd',
    },
    externals: ['react', 'react-dom', 'prop-types'],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: path.join(__dirname, 'node_modules'),
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.css$/,
          exclude: path.join(__dirname, 'node_modules'),
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    devtool: env.development ? 'source-map' : false,

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true,
      port: 3001,
    },

    plugins: [new ExtractTextPlugin('react-scrollx.css'), new UglifyJsPlugin()],
  };
});
