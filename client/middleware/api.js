/* eslint no-console:0 */
/* globals console */
import webSocket from '../config/web-socket';
import { CONNECT_LAYOUT_SOCKET,
         EMIT_ROOM_STATUSES_UPDATE,
         EMIT_CLEAR_CONNECTION_ERRORS } from '../ducks/layout';

const clearSocketErrors = (next) => next({ type: EMIT_CLEAR_CONNECTION_ERRORS });

const connectLayoutSocket = (next) => {
  webSocket.onopen = () => {
    console.log('Connected to host.');
    webSocket.send('Connected to client');
  };

  webSocket.onmessage = (event) => {
    const { meetingRooms } = JSON.parse(event.data);

    if (meetingRooms) {
      console.log('Room status update received');

      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        meetingRooms
      });
    }
  };
};

export default () => (next) => (action) => {
  switch (action.type) {
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
