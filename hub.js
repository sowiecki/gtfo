// TODO delete

// Enable ES6 import/export syntax on all server files but this one
require('babel-core/register');

const runDevices = require('./server/devices/hub').default;

runDevices();
