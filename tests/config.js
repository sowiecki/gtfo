/* eslint-env node, mocha */
/*globals window:false*/
// const expect = require('expect');

// require('app-module-path').addPath(`${__dirname}/..`);

// window.expect = expect;
//
// window.mocha.setup({
//   ui: 'bdd',
//   bail: false
// });

const context = require.context('.', true, /spec\.js(x|)?$/);
context.keys().forEach(context);
//
// if (!window.__karma__) {
//   window.mocha.run();
// }
