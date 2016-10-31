/* eslint new-cap:0 */
import WebSocket from 'ws';

import pingsController from './pings';
import consoleController from './console';
import { PROXY_HOST,
         WEBSOCKET_PROTOCOL,
         WEBSOCKET_RECONNECT_INTERVAL,
         HANDSHAKE,
         RECONNECTED,
         NEW_ROOM_PING } from '../constants';

let interval;
let webSocket;

/**
 * Handles maintaining a connection as a client to proxy's WebSocket server.
 */
const proxyController = {
  initialize() {
    clearInterval(interval);
    webSocket = new WebSocket(PROXY_HOST, WEBSOCKET_PROTOCOL);

    webSocket.onopen = this.handleConnection;
    webSocket.onmessage = this.parseEvent;
    webSocket.onclose = this.reconnect;
  },

  handleConnection() {
    if (webSocket.readyState === 1) {
      webSocket.send(JSON.stringify({ event: HANDSHAKE }));
    } else {
      consoleController.log('WebSocket is not currently open');
    }
  },

  parseEvent({ data }) {
    const { event, payload } = JSON.parse(data);

    const handlers = {
      [HANDSHAKE]() {
        consoleController.log(payload.message);
      },

      [RECONNECTED]() {
        consoleController.log(payload.message);
      },

      [NEW_ROOM_PING]() {
        pingsController.handlePingOverWS(payload);
      },

      [undefined]() {
        consoleController.log(JSON.parse(data));
      }
    };

    handlers[event]();
  },

  reconnect() {
    interval = setInterval(() => {
      proxyController.initialize();
    }, WEBSOCKET_RECONNECT_INTERVAL);
  }
};

export default proxyController;
