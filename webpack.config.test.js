const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.config');

module.exports = {
  cache: true,
  context: path.join(__dirname, 'tests'),
  entry: {
    'app': './config.js'
  },
  output: {
    path: __dirname,
    filename: '[name].tests.js',
    publicPath: '/tests/'
  },
  module: {
    loaders: [
      {
        test: /\.js(x|)?$/,
        loader: 'babel-loader?plugins[]=transform-object-rest-spread',
        include: path.join(__dirname, 'tests'),
        exclude: /node_modules/
      }
    ]
  },
  resolve: base.resolve,
  module: base.module,
  devtool: 'eval-source-map',
  debug: true
}
