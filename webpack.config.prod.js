var path = require('path');
var webpack = require('webpack');
var base = require('./webpack.config');

module.exports = {
  devtool: 'source-map',
  contet: base.context,
  entry: base.entry,
  output: {
    path:  path.resolve(__dirname, 'server', 'public', 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: base.resolve,
  module: base.module,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
}
