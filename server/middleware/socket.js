/* eslint new-cap:0, no-console:0 */
/* globals console */
import WebSocket from 'ws';
import { filter, forEach } from 'lodash/collection';

import { WEB_SOCKET_PORT } from '../config';
import { CLIENT_CONNECTED } from '../ducks/rooms';
import { HANDSHAKE, RECONNECTED, NEW_ROOM_PING } from '../constants/events';
import store from '../store/configure-store';

import { getOrigin } from '../utils/traversals';

const wss = new WebSocket.Server({ port: WEB_SOCKET_PORT });

/**
 * Clients with active WebSocket connections.
 */
const clients = {};

/**
 * Deletes client from stored clients hash.
 * @param {object} ws WebSocket properties for client.
 */
const flushClient = (ws) => delete clients[getOrigin(ws)];

/**
 * Registers client with stored clients hash.
 * Overwrites clients from same origin.
 * @param {object} ws WebSocket properties for client.
 * @param {string} anchor Anchor key of client.
 */
const registerClient = (ws, anchor) => {
  const origin = getOrigin(ws);

  clients[origin] = Object.assign(ws, { anchor });

  store().dispatch({ type: CLIENT_CONNECTED });
};

const WSWrapper = {
  open(event, payload) {
    wss.on('connection', (ws) => {
      WSWrapper.handle(event, payload, ws);

      ws.on('message', (message) => {
        message = JSON.parse(message);

        WSWrapper.handle(message.event, message.payload, ws);
      });

      ws.on('close', () => flushClient(ws));
    });
  },

  send(client, payload) {
    try {
      client.send(JSON.stringify(payload));
    } catch (e) {
      console.log(e);
    }
  },

  handle(event, payload, ws) {
    const handlers = {
      [HANDSHAKE]() { // Register client socket with anchor property.
        registerClient(ws, payload.anchor);
      },
      [RECONNECTED]() { // Reregister client socket with anchor property.
        registerClient(ws, payload.anchor);
      },
      [NEW_ROOM_PING]() { // Send ping to clients with matching anchor.
        const clientsWithAnchor = filter(clients, { anchor: payload.anchor });

        forEach(clientsWithAnchor, (client) => {
          WSWrapper.send(client, { event, payload });
        });
      },
      sendToAll() {
        forEach(clients, (client) => {
          WSWrapper.send(client, { event, payload });
        });
      }
    };

    return handlers[event] ? handlers[event]() : handlers.sendToAll();
  }
};

export default WSWrapper;
