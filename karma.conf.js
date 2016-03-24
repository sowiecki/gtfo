const webpack = require('webpack');
const path = require('path');

module.exports = (config) => {
  var configuration = {
    basePath: '.',
    frameworks: ['source-map-support', 'mocha', 'sinon'],
    reporters: ['dots'],
    files: [
      'tests/config.client.js'
    ],
    preprocessors: {
      'tests/config.client.js': ['webpack', 'sourcemap']
    },
    webpack: require('./webpack.config.test'),
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['Chrome', 'PhantomJS'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true,
    webpackServer: {
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
  };

  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
