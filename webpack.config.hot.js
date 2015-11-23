const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.config');

module.exports = {
  context: base.context,
  entry: {
    app: [
      'webpack-hot-middleware/client',
      base.entry
    ]
  },
  output: base.output,
  resolve: base.resolve,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: base.module,
  devtool: 'eval',
  debug: true
}
