/* globals __dirname */
const path = require('path');

const baseContext = path.join(__dirname, '../client');
const universalContext = path.join(__dirname, '../universal');

module.exports = {
  context: baseContext,
  entry: '../client/application.jsx',
  output: {
    path: path.resolve(__dirname, '../server', 'public', 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    alias: {
      universal: path.resolve(universalContext)
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js(x|)?$/,
        loader: 'babel-loader?plugins[]=transform-object-rest-spread',
        includes: [baseContext, universalContext],
        exclude: /node_modules/
      },
      {
        test: /\.(svg|png)$/,
        loader: 'file-loader',
        include: baseContext
      }
    ]
  }
};
