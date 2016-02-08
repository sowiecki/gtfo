/* eslint new-cap:0, no-console:0 */
/* globals console */
import WebSocket from 'ws';

import { WEB_SOCKET_PORT } from '../config';
import { ROOMS_UPDATE } from '../constants/values';
import { CLIENT_DISCONNECTED } from '../constants/errors';

const wss = new WebSocket.Server({ port: WEB_SOCKET_PORT });
let socket; // TODO this needs to be cleaned up

const WSWrapper = {
  open(type, data) {
    wss.on('connection', (ws) => {
      if (type && data) {
        WSWrapper.send(type, data);
      }

      socket = ws; // TODO maybe save this in Redux store
      ws.on('message', (message) => {
        console.log(message);
      });

      ws.send(JSON.stringify({message: 'Connected to host'}));
    });
  },

  send(type, data) {
    switch (type) {
      case ROOMS_UPDATE:
        WSWrapper.forward({
          meetingRooms: data
        });

        break;
    }
  },

  forward(data) {
    try {
      socket.send(JSON.stringify(data));
    } catch (e) {
      console.log(CLIENT_DISCONNECTED);
    }
  }
};

export default WSWrapper;
