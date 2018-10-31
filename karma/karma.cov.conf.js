const merge = require('lodash/merge');

const base = require('./karma.base.conf');

module.exports = (config) => {
  const configuration = merge(base, {
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      // 'karma-phantomjs-launcher',
      'karma-coverage-istanbul-reporter',
      'karma-webpack',
      'karma-sourcemap-loader'
    ],
    reporters: ['progress', 'coverage-istanbul'],
    // reporters: ['coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['lcov'],
      dir: './coverage',
      fixWebpackSourcePaths: true
    },
    // coverageReporter: {
    //   type: 'lcov',
    //   dir: '../coverage/',
    //   instrumenterOptions: {
    //     istanbul: { noCompact: true, embedSource: true }
    //   }
    // },
    // webpack: require('../webpack/webpack.cov.config'),
    logLevel: config.LOG_INFO
  });

  if (process.env.TRAVIS) {
    configuration.browsers = ['ChromeTravisCi'];
  }

  config.set(configuration);
};
