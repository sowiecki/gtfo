/* eslint new-cap:0, no-console:0 */
/* globals console */
import WebSocket from 'ws';

import { WEB_SOCKET_PORT } from '../config';
import { ROOMS_UPDATE } from '../constants/values';

const wss = new WebSocket.Server({ port: WEB_SOCKET_PORT });
let socket = {send: () => {}}; // TODO this needs to be cleaned up

export default {
  open() {
    wss.on('connection', (ws) => {
      socket = ws; // TODO maybe save this in Redux store
      ws.on('message', (message) => {
        console.log(message);
      });

      // TODO better defaulting of meeting rooms, maybe read from devices.json?
      ws.send(JSON.stringify({message: 'Connected to host', meetingRooms: []}));
    });
  },
  send(type, data) {
    switch (type) {
      case ROOMS_UPDATE:
        socket.send(JSON.stringify({
          meetingRooms: data
        }));

        break;
    }
  }
};
