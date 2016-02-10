/* eslint no-console:0 */
/* globals WebSocket, console, setInterval, clearInterval */
import handleEvent from './handlers';
import { getSocketPort,
         WEBSOCKET_PROTOCOL,
         WEBSOCKET_RECONNECT_INTERVAL } from '../config/web-socket';
import { CONNECT_LAYOUT_SOCKET,
         EMIT_FETCH_ROOM_STATUSES_ERROR,
         EMIT_CLEAR_CONNECTION_ERRORS } from '../ducks/layout';
import { lostConnectionToHost } from '../constants/errors';
import { HANDSHAKE, RECONNECTED } from '../constants/events';

// TODO this file needs some TLC

let interval;

const clearSocketErrors = (next) => next({ type: EMIT_CLEAR_CONNECTION_ERRORS });

const attemptToReconnect = (next) => {
  const webSocket = new WebSocket(getSocketPort(), WEBSOCKET_PROTOCOL);
  console.log('Attempting to reconnect...');

  webSocket.onopen = () => {
    console.log('Reconnected to host.');
    webSocket.send({ event: RECONNECTED, payload: { message: 'Reconnected to client' }});

    clearInterval(interval);
    clearSocketErrors(next);
  };

  webSocket.onmessage = handleEvent.bind(null, next);
};

const connectLayoutSocket = (next, locator) => {
  const webSocket = new WebSocket(getSocketPort(), WEBSOCKET_PROTOCOL);

  webSocket.onopen = () => {
    console.log('Connected to host.');
    webSocket.send(JSON.stringify({ event: HANDSHAKE, payload: { locator } }));

    clearSocketErrors(next);
  };

  webSocket.onmessage = handleEvent.bind(null, next);

  webSocket.onclose = () => {
    interval = setInterval(() => attemptToReconnect(next), WEBSOCKET_RECONNECT_INTERVAL);

    next({
      type: EMIT_FETCH_ROOM_STATUSES_ERROR,
      error: lostConnectionToHost
    });
  };
};

export default (store) => (next) => (action) => {
  const locator = store.getState().routeReducer.location.pathname.replace(/[/]/g, '');

  switch (action.type) {
    case EMIT_FETCH_ROOM_STATUSES_ERROR:
    case CONNECT_LAYOUT_SOCKET:
      connectLayoutSocket(next, locator);

      break;
    default:
      next(action);

      break;
  }
};
