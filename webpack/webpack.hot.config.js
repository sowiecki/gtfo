const webpack = require('webpack');
const base = require('./webpack.config');

module.exports = {
  context: base.context,
  entry: {
    app: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      base.entry
    ]
  },
  output: base.output,
  resolve: base.resolve,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  module: base.module,
  devtool: 'eval-source-map',
  externals: base.externals
};
