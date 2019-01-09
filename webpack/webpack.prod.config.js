/* globals __dirname */
const webpack = require('webpack');
const base = require('./webpack.config');

module.exports = {
  mode: 'production',
  context: base.context,
  entry: base.entry,
  output: base.output,
  resolve: base.resolve,
  module: base.module,
  optimization: {
    minimize: true
  },
  plugins: [
    ...base.plugins,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        HOT: false
      }
    })
  ],
  devtool: 'source-map'
};
