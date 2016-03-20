/* eslint-env node, mocha */

const context = require.context('./client', true, /spec\.js(x|)?$/);
context.keys().forEach(context);
