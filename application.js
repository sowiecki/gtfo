#!/usr/bin/env node

/* eslint no-console:0 */
/* globals console */

const cluster = require('cluster');

// Enable ES6 import/export syntax on all server files but this one
require('babel-core/register');

// Restarts system in case of catastrophic failure
if (cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', (deadWorker) => {
    const worker = cluster.fork();

    console.log(`worker ${deadWorker.process.pid} died`);
    console.log(`worker ${worker.process.pid} born`);
  });
} else {
  require('./server');
}
