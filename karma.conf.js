const webpack = require('webpack');
const path = require('path');

module.exports = (config) => {
  config.set({
    basePath: '.',
    frameworks: ['source-map-support', 'mocha', 'sinon'],
    reporters: ['mocha'],
    files: [
      './tests/config.client.js'
    ],
    preprocessors: {
      './tests/config.client.js': ['webpack', 'sourcemap']
    },
    webpack: require('./webpack.config.test'),
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: [/*'Chrome',*/ 'PhantomJS'],
    singleRun: true,
    webpackServer: {
      // port: 3002, // Choose a non-conflicting port (3000 app, 3001 test dev)
      quiet: false,
      noInfo: true,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    },
    logLevel: config.LOG_INFO
  });
};
