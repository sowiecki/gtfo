module.exports = {
  basePath: '.',
  frameworks: ['mocha'],
  reporters: ['dots'],
  files: [
    { pattern: '../node_modules/babel-polyfill/browser.js', instrument: false },
    '../tests/config.client.js'
  ],
  preprocessors: {
    '../tests/config.client.js': ['webpack', 'sourcemap']
  },
  webpack: require('../webpack/webpack.test.config'),
  port: 9876,
  colors: true,
  autoWatch: true,
  browsers: ['Chrome'],
  customLaunchers: {
    ChromeTravisCi: {
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
  }
};
