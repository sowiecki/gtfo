/* eslint no-shadow:0, no-use-before-define:0 */
/* globals WebSocket, setInterval, clearInterval */
import parseEvent from './parse-event';

import { getSocketPort } from '../config/web-socket';
import { EMIT_FETCH_ROOM_STATUSES_ERROR,
         EMIT_CLEAR_CONNECTION_ERRORS } from '../ducks/layout';
import { HANDSHAKE, RECONNECTED,
         WEBSOCKET_PROTOCOL,
         WEBSOCKET_RECONNECT_INTERVAL,
         lostConnectionToHost } from '../constants';

// TODO maybe store this in Redux state
let webSocket;
let interval;

const handleSocketOpen = (webSocket, next, payload) => {
  webSocket.send(JSON.stringify({ event: HANDSHAKE, payload }));

  next({ type: EMIT_CLEAR_CONNECTION_ERRORS });
};

const handleSocketReconnected = (webSocket, next, payload) => {
  webSocket.send(JSON.stringify({ event: RECONNECTED, payload }));

  next({ type: EMIT_CLEAR_CONNECTION_ERRORS });
  clearInterval(interval);

  webSocket.onclose = handleSocketClose.bind(null, next, payload);
};

const reconnectSocket = (next, payload) => {
  webSocket = new WebSocket(getSocketPort(), WEBSOCKET_PROTOCOL);

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
  webSocket = new WebSocket(getSocketPort(), WEBSOCKET_PROTOCOL);

  webSocket.onopen = handleSocketOpen.bind(null, webSocket, next, payload);
  webSocket.onmessage = parseEvent.bind(null, next);
  webSocket.onclose = handleSocketClose.bind(null, next, payload);
};

export const send = (event, payload) => webSocket.send(JSON.stringify({ event, payload }));

export default connectSocket;
