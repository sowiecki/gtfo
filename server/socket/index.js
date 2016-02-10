/* eslint new-cap:0, no-console:0 */
/* globals console */
import WebSocket from 'ws';
import remove from 'lodash/array/remove';

import { WEB_SOCKET_PORT } from '../config';
import { CONNECTION_ESTABLISHED } from '../constants/events';
// import { CLIENT_DISCONNECTED } from '../constants/errors';

const wss = new WebSocket.Server({ port: WEB_SOCKET_PORT });
const clients = [];

const initialEvent = JSON.stringify({
  event: CONNECTION_ESTABLISHED,
  payload: null
});
const getOrigin = (client) => client.upgradeReq.headers.origin;
const flushClient = (ws) => {
  remove(clients, (client) => getOrigin(client) === getOrigin(ws));
};

const WSWrapper = {
  open(event, payload) {
    wss.on('connection', (ws) => {
      clients.push(ws);

      if (event && payload) {
        WSWrapper.send(event, payload);
      }

      ws.send(initialEvent);

      ws.on('message', (message) => console.log(message));

      ws.on('close', () => flushClient(ws));
    });
  },

  send(event, payload) {
    clients.forEach((client) => {
      try {
        client.send(JSON.stringify({ event, payload }));
      } catch (e) {
        // TODO Cleanup so this isn't so spammy
        // console.log(CLIENT_DISCONNECTED);
      }
    });
  }
};

export default WSWrapper;
