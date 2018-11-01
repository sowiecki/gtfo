const { WebSocket, Server } = require('mock-socket');

WebSocket.Server = Server;

module.exports = WebSocket;
