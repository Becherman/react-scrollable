var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = env => ({
  entry: path.resolve(__dirname, 'public'),
  output: {
    filename: 'page.bundle.js',
    path: __dirname
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: env.development ? 'source-map' : false,

  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3002
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.join(__dirname, 'node_modules'),
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Scrollx'
    })
  ]
})