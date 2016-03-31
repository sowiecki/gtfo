const webpack = require('webpack');
const base = require('./webpack.config');

module.exports = {
  context: base.context,
  entry: base.entry,
  output: base.output,
  resolve: base.resolve,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: base.module,
  devtool: 'eval-source-map',
  debug: true
};
