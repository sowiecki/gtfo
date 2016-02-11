/* eslint new-cap:0, no-console:0 */
import WebSocket from 'ws';
import { filter, forEach } from 'lodash/collection';

import { WEB_SOCKET_PORT } from '../config';
import { HANDSHAKE, NEW_ROOM_PING } from '../constants/events';
// import { UNEXPECTED_SOCKET_ERROR } from '../constants/errors';

import { getOrigin } from '../utils/traversals';

const wss = new WebSocket.Server({ port: WEB_SOCKET_PORT });
const clients = {};
const flushClient = (ws) => delete clients[getOrigin(ws)];

const WSWrapper = {
  open(event, payload) {
    wss.on('connection', (ws) => {
      clients[getOrigin(ws)] = ws;

      WSWrapper.handle(event, payload);

      ws.on('message', (message) => {
        message = JSON.parse(message);
        message.payload.ws = ws;

        WSWrapper.handle(message.event, message.payload);
      });

      ws.on('close', () => flushClient(ws));
    });
  },

  send(client, message) {
    try {
      client.send(JSON.stringify(message));
    } catch (e) {
      // console.log(UNEXPECTED_SOCKET_ERROR); // TODO make less spammy
    }
  },

  handle(event, payload) {
    const clientsWithLocator = filter(clients, { locator: payload.locator });

    const handlers = {
      [HANDSHAKE]() {
        clients[getOrigin(payload.ws)].locator = payload.locator;
      },
      [NEW_ROOM_PING]() {
        forEach(clientsWithLocator, (client) => {
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
