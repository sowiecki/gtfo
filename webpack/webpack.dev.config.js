const webpack = require('webpack');
const base = require('./webpack.config');

module.exports = {
  mode: 'development',
  context: base.context,
  entry: base.entry,
  output: base.output,
  resolve: base.resolve,
  plugins: [new webpack.optimize.OccurenceOrderPlugin(), new webpack.NoErrorsPlugin()],
  module: base.module,
  devtool: 'cheap-module-source-map',
  debug: true
};
