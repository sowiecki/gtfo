/* eslint no-console:0 */
/* globals __dirname */
require('@babel/register'); // Necessary to load the consoleController for reporting webpack bundle output

const path = require('path');
const merge = require('lodash/merge');
const WebpackMessages = require('webpack-messages');

const baseContext = path.join(__dirname, '../client');
const environmentConext = path.join(__dirname, '../environment');
const universalContext = path.join(__dirname, '../universal');
const consoleController = require('../server/controllers/console').default;

console.log = consoleController.log;
console.warn = consoleController.log;
console.info = consoleController.log;

module.exports = {
  context: baseContext,
  entry: '../client/index.jsx',
  output: {
    path: path.resolve(__dirname, '../server', 'public', 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    modules: [baseContext, 'node_modules'],
    alias: {
      universal: path.resolve(universalContext)
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js(x|)?$/,
        use: {
          loader: 'babel-loader',

          // Work-around to enable commonjs on server and native modules on client,
          // while (mostly) maintaining one source for Babel configuration
          options: merge(require('../babel.config'), {
            babelrc: false,
            presets: ['@babel/env', '@babel/react']
          })
        },
        include: [baseContext, universalContext],
        exclude: /node_modules/
      },
      {
        test: /\.(svg|png)$/,
        use: {
          loader: 'file-loader'
        },
        include: [baseContext, environmentConext],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new WebpackMessages({
      name: 'client',
      logger: consoleController.log
    })
  ]
};
