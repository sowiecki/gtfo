import connectSocket from './connect-socket';
import { CONNECT_SOCKET,
         EMIT_FETCH_ROOM_STATUSES_ERROR } from '../ducks/layout';
import { HANDSHAKE } from '../constants/events';

import { getAnchor } from '../utils/rooms';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case CONNECT_SOCKET:
    case EMIT_FETCH_ROOM_STATUSES_ERROR:
      const payload = { anchor: getAnchor(store) };

      connectSocket(next, HANDSHAKE, payload);

      break;
  }

  next(action);
};
