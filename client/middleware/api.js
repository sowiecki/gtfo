import connectSocket, { send } from './connect-socket';
import { TIME_TRAVEL_UPDATE } from '../constants';
import { EMIT_TIME_TRAVEL_UPDATE } from '../ducks/navigation';
import { CONNECT_SOCKET,
  EMIT_FETCH_ROOM_STATUSES_ERROR } from '../ducks/layout';

export default () => (next) => (action) => {
  switch (action.type) {
    case CONNECT_SOCKET:
    case EMIT_FETCH_ROOM_STATUSES_ERROR:
      connectSocket(next, action.payload);

      break;

    case EMIT_TIME_TRAVEL_UPDATE:
      send(TIME_TRAVEL_UPDATE, action.timeTravelTime);
  }

  next(action);
};
