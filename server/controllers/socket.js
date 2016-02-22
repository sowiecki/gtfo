/* eslint new-cap:0, no-console:0 */
/* globals console */
import WebSocket from 'ws';
import { filter, forEach } from 'lodash/collection';

import { WEB_SOCKET_PORT } from '../config';
import { EMIT_CLIENT_CONNECTED } from '../ducks/rooms';
import { INITIALIZE, HANDSHAKE, RECONNECTED, NEW_ROOM_PING } from '../constants/events';
import store from '../store/configure-store';

import { getOrigin } from '../utils/traversals';

const wss = new WebSocket.Server({ port: WEB_SOCKET_PORT });

/**
 * Clients with active WebSocket connections.
 */
const clients = {};

/**
 * Deletes client from stored clients hash.
 * @param {object} client WebSocket properties for client.
 */
const flushClient = (client) => delete clients[getOrigin(client)];

/**
 * Registers client with stored clients hash.
 * Overwrites clients from same origin.
 * @param {string} anchor Anchor key of client.
 * @param {object} client WebSocket properties for client.
 */
const registerClient = (anchor, client) => {
  const origin = getOrigin(client);

  clients[origin] = Object.assign(client, { anchor });

  store().dispatch({
    type: EMIT_CLIENT_CONNECTED,
    anchor,
    client
  });
};

const socketController = {
  open(event, payload) {
    wss.on('connection', (client) => {
      socketController.handle(event, payload, client);

      client.on('message', (message) => {
        message = JSON.parse(message);

        socketController.handle(message.event, message.payload, client);
      });

      client.on('close', () => flushClient(client));
    });
  },

  send(event, payload, client) {
    try {
      client.send(JSON.stringify({ event, payload }));
    } catch (e) {
      console.log(e);
    }
  },

  handle(event, payload, client) {
    const handlers = {
      [HANDSHAKE]() { // Register client socket with anchor parameter.
        registerClient(payload.anchor, client);
      },
      [INITIALIZE]() {
        socketController.send(event, payload, client);
      },
      [RECONNECTED]() { // Reregister client socket with anchor parameter.
        registerClient(payload.anchor, client);
      },
      [NEW_ROOM_PING]() { // Send ping to clients with matching anchor parameter.
        const clientsWithAnchor = filter(clients, { anchor: payload.anchor });

        forEach(clientsWithAnchor, (clientWithAnchor) => {
          socketController.send(event, payload, clientWithAnchor);
        });
      },
      sendToAll() {
        forEach(clients, (ws) => {
          socketController.send(event, payload, ws);
        });
      }
    };

    return handlers[event] ? handlers[event]() : handlers.sendToAll();
  }
};

export default socketController;
