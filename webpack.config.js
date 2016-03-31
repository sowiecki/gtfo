/* globals __dirname */
const path = require('path');

module.exports = {
  context: __dirname,
  entry: './client/application.jsx',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js(x|)?$/,
        loader: 'babel-loader?plugins[]=transform-object-rest-spread',
        include: path.join(__dirname, 'client'),
        exclude: /node_modules/
      },
      {
        test: /\.(svg|png)$/,
        loader: 'file-loader',
        include: path.join(__dirname, 'client')
      }
    ]
  }
};
