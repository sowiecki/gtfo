var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './client/application.jsx',
  output: {
    path:  path.resolve(__dirname, './public/dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'client'),
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'client')
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        include: path.join(__dirname, 'client')
      }
    ]
  }
};
