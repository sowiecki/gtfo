/* eslint new-cap:0, no-console:0 */
/* globals console */
import WebSocket from 'ws';

import pingsController from './pings';
import { proxy_HOST,
         WEBSOCKET_PROTOCOL,
         WEBSOCKET_RECONNECT_INTERVAL,
         HANDSHAKE,
         RECONNECTED,
         NEW_ROOM_PING } from '../constants';

let interval, webSocket;

/**
 * Handles maintaining a connection as a client to proxy's WebSocket server.
 */
const proxyController = {
  initialize() {
    clearInterval(interval);
    webSocket = new WebSocket(proxy_HOST, WEBSOCKET_PROTOCOL);

    webSocket.onopen = this.handleConnection;
    webSocket.onmessage = this.parseEvent;
    webSocket.onclose = this.reconnect;
  },

  handleConnection() {
    webSocket.send(JSON.stringify({ event: HANDSHAKE }));
  },

  parseEvent({ data }) {
    const { event, payload } = JSON.parse(data);

    const handlers = {
      [HANDSHAKE]() {
        console.log(payload.message);
      },

      [RECONNECTED]() {
        console.log(payload.message);
      },

      [NEW_ROOM_PING]() {
        pingsController.handlePingOverWS(payload);
      },

      [undefined]() {
        console.log(JSON.parse(data));
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
