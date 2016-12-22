const testConfig = require('./webpack.test.config');

testConfig.module.postLoaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|tests)/,
    loader: 'istanbul-instrumenter'
  }
];

module.exports = testConfig;
