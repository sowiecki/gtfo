const testConfig = require('./webpack.test.config');

testConfig.module.rules.push({
  test: /\.(js|jsx)$/,
  enforce: 'post',
  exclude: /(node_modules|tests)/,
  use: {
    loader: 'istanbul-instrumenter-loader'
  }
});

module.exports = testConfig;
