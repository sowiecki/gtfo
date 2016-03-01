#!/usr/bin/env node

const cluster = require('cluster');

// Enable ES6 import/export syntax on all server files but this one
require('babel-core/register');

if (cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', (deadWorker, code, signal) => {
    const worker = cluster.fork();

    console.log(`worker ${deadWorker.process.pid} died`);
    console.log(`worker ${worker.process.pid} born`);
  });
} else {
  const app = require('./server/server');
  const config = require('./server/config');
}
