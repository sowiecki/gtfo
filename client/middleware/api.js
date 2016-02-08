/* eslint no-console:0 */
/* globals WebSocket, console, setInterval, clearInterval */
import { getSocketPort,
         WEBSOCKET_PROTOCOL,
         WEBSOCKET_RECONNECT_INTERVAL } from '../config/web-socket';
import { CONNECT_LAYOUT_SOCKET,
         EMIT_ROOM_STATUSES_UPDATE,
         EMIT_FETCH_ROOM_STATUSES_ERROR,
         EMIT_CLEAR_CONNECTION_ERRORS } from '../ducks/layout';
import { lostConnectionToHost } from '../constants/errors';

let interval;

const clearSocketErrors = (next) => next({ type: EMIT_CLEAR_CONNECTION_ERRORS });

const handleEvent = (next, event) => {
  const { meetingRooms } = JSON.parse(event.data);

  if (meetingRooms) {
    console.log('Room status update received');

    next({
      type: EMIT_ROOM_STATUSES_UPDATE,
      meetingRooms
    });
  }
};

const attemptToReconnect = (next) => {
  const webSocket = new WebSocket(getSocketPort(), WEBSOCKET_PROTOCOL);
  console.log('Attempting to reconnect...');

  webSocket.onopen = () => {
    console.log('Reconnected to host.');
    webSocket.send('Reconnected to client');

    clearInterval(interval);
    clearSocketErrors(next);
  };

  webSocket.onmessage = handleEvent.bind(null, next);
};

const connectLayoutSocket = (next) => {
  const webSocket = new WebSocket(getSocketPort(), WEBSOCKET_PROTOCOL);

  webSocket.onopen = () => {
    console.log('Connected to host.');
    webSocket.send('Connected to client');

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

export default () => (next) => (action) => {
  switch (action.type) {
    case EMIT_FETCH_ROOM_STATUSES_ERROR:
    case CONNECT_LAYOUT_SOCKET:
      connectLayoutSocket(next);

      break;
    case EMIT_CLEAR_CONNECTION_ERRORS:
      clearSocketErrors(next);

      break;
    default:
      next(action);

      break;
  }
};
