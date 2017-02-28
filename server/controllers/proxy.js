/* eslint new-cap:0 */
import WebSocket from 'ws';

import pingsController from './pings';
import consoleController from './console';
import { send } from '../utils';
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

    webSocket.onopen = this.handleSocketOpen;
    webSocket.onmessage = this.parseEvent;
    webSocket.onclose = this.reconnect;
    webSocket.onerror = this.handleError;
  },

  handleSocketOpen() {
    proxyController.send(HANDSHAKE, null, webSocket);
  },

  parseEvent({ data }) {
    const { payload } = JSON.parse(data);

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

    handlers[payload.event]();
  },

  reconnect() {
    interval = setInterval(() => {
      proxyController.initialize();
    }, WEBSOCKET_RECONNECT_INTERVAL);
  },

  handleError(e) {
    consoleController.log(`Proxy error: ${e}`);
  },

  send
};

export default proxyController;
