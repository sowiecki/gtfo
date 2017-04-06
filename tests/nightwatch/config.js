const chromedriver = require('chromedriver');

module.exports = {
  before(done) {
    chromedriver.start();

    if (typeof done === 'function') {
      done();
    }
  },

  after(done) {
    chromedriver.stop();

    if (typeof done === 'function') {
      done();
    }
  }
};
