import connectSocket from './connect-socket';
import { CONNECT_SOCKET,
         EMIT_FETCH_ROOM_STATUSES_ERROR } from '../ducks/layout';

export default () => (next) => (action) => {
  switch (action.type) {
    case CONNECT_SOCKET:
    case EMIT_FETCH_ROOM_STATUSES_ERROR:
      connectSocket(next, action.payload);

      break;
  }

  next(action);
};
