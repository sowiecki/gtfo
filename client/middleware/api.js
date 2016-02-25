import connectSocket from './connect-socket';
import { CONNECT_SOCKET,
         EMIT_FETCH_ROOM_STATUSES_ERROR } from '../ducks/layout';

import { getAnchorFromStore } from '../utils/rooms';

export default (store) => (next) => (action) => {
  const payload = { anchor: getAnchorFromStore(store) };

  switch (action.type) {
    case CONNECT_SOCKET:
    case EMIT_FETCH_ROOM_STATUSES_ERROR:
      connectSocket(next, payload);

      break;
  }

  next(action);
};
