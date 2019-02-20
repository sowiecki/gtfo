/* eslint new-cap:0 */
import WebSocket from 'ws';
import { get } from 'lodash';

import devicesController from './devices';
import pingsController from './pings';
import consoleController from './console';
import { send, genURL } from '../utils';
import {
  WEBSOCKET_PROTOCOL,
  WEBSOCKET_RECONNECT_INTERVAL,
  HANDSHAKE,
  RECONNECTED,
  NEW_ROOM_PING,
  ROOM_EVENT,
  UNDEFINED_EVENT
} from '../constants';
import { config } from '../../environment';

let interval;
let webSocket;

/**
 * Handles maintaining a connection as a client to proxy's WebSocket server.
 */
const proxyController = {
  initialize() {
    if (!config.proxy) return;

    clearInterval(interval);

    webSocket = new WebSocket(genURL(config.proxy), WEBSOCKET_PROTOCOL);

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
    // TODO update Acheron to forward event types adjecent to body and headers
    const eventHandler = get(payload, 'event')
      || get(payload.headers, 'event')
      || get(payload, 'body.event', UNDEFINED_EVENT);

    const HANDLERS_MAP = {
      [HANDSHAKE]() {
        consoleController.log(payload.message);
      },

      [RECONNECTED]() {
        consoleController.log(payload.message);
      },

      [NEW_ROOM_PING]() {
        pingsController.handlePingOverWS(payload);
      },

      [ROOM_EVENT]() {
        devicesController.handleRoomEvent(payload);
      },

      [UNDEFINED_EVENT]() {
        consoleController.log(`Undefined event ${eventHandler}`, JSON.parse(data));
      }
    };

    HANDLERS_MAP[eventHandler]();
  },

  reconnect() {
    interval = setInterval(() => {
      proxyController.initialize();
    }, WEBSOCKET_RECONNECT_INTERVAL);
  },

  handleError(e) {
    consoleController.dir(`Proxy error: ${e}`);
  },

  send
};

export default proxyController;
