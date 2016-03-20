/* globals WebSocket, setInterval, clearInterval */
import parseEvent from './parse-event';

import { getSocketPort,
         WEBSOCKET_PROTOCOL,
         WEBSOCKET_RECONNECT_INTERVAL } from '../config/web-socket';
import { EMIT_FETCH_ROOM_STATUSES_ERROR,
         EMIT_CLEAR_CONNECTION_ERRORS } from '../ducks/layout';
import { HANDSHAKE, RECONNECTED, lostConnectionToHost } from '../constants';

let interval;

const handleSocketOpen = (webSocket, next, payload) => {
  webSocket.send(JSON.stringify({ event: HANDSHAKE, payload }));
console.log(payload)
  next({ type: EMIT_CLEAR_CONNECTION_ERRORS });
};

const handleSocketReconnected = (webSocket, next, payload) => {
  webSocket.send(JSON.stringify({ event: RECONNECTED, payload }));

  next({ type: EMIT_CLEAR_CONNECTION_ERRORS });
  clearInterval(interval);
};

const reconnectSocket = (next, payload) => {
  const webSocket = new WebSocket(getSocketPort(), WEBSOCKET_PROTOCOL);

  webSocket.onopen = handleSocketReconnected.bind(null, webSocket, next, payload);
  webSocket.onmessage = parseEvent.bind(null, next);
};

const handleSocketClose = (next, payload) => {
  interval = setInterval(() => {
    reconnectSocket(next, payload);
  }, WEBSOCKET_RECONNECT_INTERVAL);

  next({
    type: EMIT_FETCH_ROOM_STATUSES_ERROR,
    error: lostConnectionToHost
  });
};

const connectSocket = (next, payload) => {
  const webSocket = new WebSocket(getSocketPort(), WEBSOCKET_PROTOCOL);

  webSocket.onopen = handleSocketOpen.bind(null, webSocket, next, payload);
  webSocket.onmessage = parseEvent.bind(null, next);
  webSocket.onclose = handleSocketClose.bind(null, next, payload);
};

export default connectSocket;
