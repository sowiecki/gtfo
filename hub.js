// TODO integrate this into the server

// Enable ES6 import/export syntax on all server files but this one
require('babel-core/register');

const run = require('./server/devices/hub').default;

run();
