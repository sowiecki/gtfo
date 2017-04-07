/* eslint new-cap:0 */
import WebSocket from 'ws';
import { get } from 'lodash';

import devicesController from './devices';
import pingsController from './pings';
import consoleController from './console';
import { send } from '../utils';
import { PROXY_HOST,
         WEBSOCKET_PROTOCOL,
         WEBSOCKET_RECONNECT_INTERVAL,
         HANDSHAKE,
         RECONNECTED,
         NEW_ROOM_PING,
         NEW_ROOM_MOTION,
         UNDEFINED_EVENT } from '../constants';
import { config } from '../environment';

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
    const payload = { headers: { id: config.id } };

    proxyController.send(HANDSHAKE, payload, webSocket);
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

      [NEW_ROOM_MOTION]() {
        devicesController.handleIndirectMotion(payload);
      },

      [UNDEFINED_EVENT]() {
        consoleController.log(JSON.parse(data));
      }
    };

    const eventHandler = get(payload, 'event', UNDEFINED_EVENT);
    handlers[eventHandler]();
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
