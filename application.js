#!/usr/bin/env node

// Enable ES6 import/export syntax on all server files but this one
require("babel/register");

const server = require('./server/server');
const config = require('./server/config');

server.listen(config.serverPort, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${config.serverPort}`);
});
