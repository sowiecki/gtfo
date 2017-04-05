/* eslint-env node, mocha */
/* eslint no-unused-expressions:0 */

module.exports = {
  'Map Legend toggling': (browser) => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .assert.title('Slalom Office Insight')
      .assert.visible('div#root')
      .waitForElementVisible('#map-legend', 3000)
      .assert.visible('#map-legend')
      .click('span#toggle-map-legend');

    browser.expect.element('div#map-legend').to.not.be.present;
    browser.click('span#toggle-map-legend');
    browser.expect.element('div#map-legend').to.be.present;

    browser.pause(1000).end();
  }
};
