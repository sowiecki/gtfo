/* globals __dirname */
const path = require('path');
const merge = require('lodash/merge');

const baseContext = path.join(__dirname, '../client');
const environmentConext = path.join(__dirname, '../environment');
const universalContext = path.join(__dirname, '../universal');

const aliasSafety = (result, developmentModule) => {
  const isProd = process.env.NODE_ENV === 'production';

  nullModulePath = path.join(__dirname, '../client/components/common/loading');

  result[developmentModule] = isProd ? nullModulePath : developmentModule;

  return result;
};

/**
 * Development-only modules listed here will be aliased to an arbitrary replacement,
 * to prevent them from being used in production.
 */
const developmentModules = [
  'redux-devtools',
  'redux-devtools-dock-monitor',
  'redux-devtools-log-monitor',
  'redux-slider-monitor',
  'redux-devtools-chart-monitor',
  'redux-devtools-diff-monitor',
  'redux-devtools-inspector',
  'redux-devtools-dispatch'
].reduce(aliasSafety, {});

module.exports = {
  context: baseContext,
  entry: '../client/application.jsx',
  output: {
    path: path.resolve(__dirname, '../server', 'public', 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    root: baseContext,
    alias: merge({
      universal: path.resolve(universalContext)
    }, developmentModules),
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
        includes: [baseContext, environmentConext],
        exclude: /node_modules/
      }
    ]
  }
};
