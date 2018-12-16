const webpack = require('webpack');
const base = require('./webpack.config');

module.exports = {
  mode: 'development',
  context: base.context,
  entry: base.entry,
  output: base.output,
  resolve: base.resolve,
  plugins: [
    ...base.plugins,
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  module: base.module,
  devtool: 'cheap-module-source-map',
  externals: base.externals
};
