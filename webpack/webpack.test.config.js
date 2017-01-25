/* globals __dirname */
const webpack = require('webpack');

const base = require('./webpack.config');

module.exports = {
  cache: true,
  devtool: 'inline-source-map',
  context: base.context,
  module: {
    rules: [
      {
        test: /\.js(x|)?$/,
        use: {
          loader: 'babel-loader?plugins[]=transform-object-rest-spread'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(svg|png)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader'
        }
      }
    ]
  },
  resolve: base.resolve,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test'),
      'process.env.SKIP_BC': JSON.stringify(process.env.SKIP_BC || false),
      'process.env.FAIL_ON_WARNINGS': JSON.stringify(process.env.FAIL_ON_WARNINGS || false)
    })
  ],
  externals: {
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  }
};
