/* eslint new-cap:0, no-console:0 */
import WebSocket from 'ws';
import { find, forEach } from 'lodash/collection';

import { WEB_SOCKET_PORT } from '../config';
import { HANDSHAKE, NEW_ROOM_PING } from '../constants/events';
// import { CLIENT_DISCONNECTED } from '../constants/errors';

const wss = new WebSocket.Server({ port: WEB_SOCKET_PORT });
const clients = {};

const initialEvent = JSON.stringify({
  event: HANDSHAKE,
  payload: null
});
const getOrigin = (client) => client.upgradeReq.headers.origin;
const flushClient = (ws) => {
  delete clients[getOrigin(ws)];
};

const WSWrapper = {
  open(event, payload) {
    wss.on('connection', (ws) => {
      clients[getOrigin(ws)] = ws;

      WSWrapper.parse(initialEvent);
      WSWrapper.parse(event, payload);

      ws.on('message', (message) => {
        const { event, payload } = JSON.parse(message); // TODO break out
        if (event === HANDSHAKE) {
          clients[getOrigin(ws)].locator = payload.locator;
        }
      });

      ws.on('close', () => flushClient(ws));
    });
  },

  parse(event, payload) {
    switch (event) {
      case NEW_ROOM_PING:
        const client = find(clients, { locator: payload.locator });
          WSWrapper.send(client, { event, payload });
        break;
      default:
        forEach(clients, (client) => {
          WSWrapper.send(client, { event, payload });
        });

        break;
    }
  },

  send(client, message) {
    try {
      client.send(JSON.stringify(message));
    } catch (e) {
      // TODO Cleanup so this isn't so spammy
      // console.log(CLIENT_DISCONNECTED);
    }
  }
};

export default WSWrapper;
