/* globals __dirname */
const webpack = require('webpack');
const base = require('./webpack.config');

module.exports = {
  devtool: 'source-map',
  context: base.context,
  entry: base.entry,
  output: base.output,
  resolve: base.resolve,
  module: base.module,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};