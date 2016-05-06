/* eslint new-cap:0, no-console:0 */
/* globals console */
import WebSocket from 'ws';

import pingsController from './pings';
import { ACHERON_HOST,
         WEBSOCKET_PROTOCOL,
         WEBSOCKET_RECONNECT_INTERVAL,
         HANDSHAKE,
         RECONNECTED,
         NEW_ROOM_PING } from '../constants';

let interval;

/**
 * Handles maintaining a connection as a client to Acheron's WebSocket server.
 */
const acheronController = {
  initialize() {
    const webSocket = new WebSocket(ACHERON_HOST, WEBSOCKET_PROTOCOL);

    webSocket.onopen = this.handleConnection.bind(null, webSocket);
    webSocket.onmessage = this.parseEvent;
    webSocket.onclose = this.reconnect;
  },

  handleConnection(webSocket) {
    clearInterval(interval);
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
      acheronController.initialize();
    }, WEBSOCKET_RECONNECT_INTERVAL);
  }
};

export default acheronController;
