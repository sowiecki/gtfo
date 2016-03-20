import { EMIT_ROOM_STATUSES_UPDATE,
         EMIT_SET_ROOM_PING,
         EMIT_MARKERS_UPDATE,
         EMIT_CLEAR_CONNECTION_ERRORS } from '../ducks/layout';
import { HANDSHAKE,
         INITIALIZE_ROOMS,
         INITIALIZE_MARKERS,
         RECONNECTED,
         ROOM_STATUSES_UPDATE,
         NEW_ROOM_PING } from '../constants';

const parseEvent = (next, response) => {
  const { event, payload } = JSON.parse(response.data);

  const handlers = {
    [HANDSHAKE]() {
      next({ type: EMIT_CLEAR_CONNECTION_ERRORS });
    },
    [INITIALIZE_ROOMS]() {
      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        meetingRooms: payload
      });
    },
    [INITIALIZE_MARKERS]() {
      next({
        type: EMIT_MARKERS_UPDATE,
        markers: payload
      });
    },
    [RECONNECTED]() {
      next({ type: EMIT_CLEAR_CONNECTION_ERRORS });
    },
    [ROOM_STATUSES_UPDATE]() {
      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        meetingRooms: payload
      });
    },
    [NEW_ROOM_PING]() {
      next({
        type: EMIT_SET_ROOM_PING,
        ping: payload
      });
    }
  };

  handlers[event]();
};

export default parseEvent;
