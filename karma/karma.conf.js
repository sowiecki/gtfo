const merge = require('lodash/merge');

const base = require('./karma.base.conf');

module.exports = (config) => {
  const configuration = merge(base, {
    logLevel: config.LOG_INFO
  });

  if (process.env.TRAVIS) {
    configuration.browsers = ['ChromeTravisCi'];
  }

  config.set(configuration);
};
