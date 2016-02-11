import { EMIT_ROOM_STATUSES_UPDATE,
         EMIT_SET_ROOM_PING,
         EMIT_CLEAR_CONNECTION_ERRORS } from '../ducks/layout';
import { CONNECTION_ESTABLISHED,
         ROOM_STATUSES_UPDATE,
         NEW_ROOM_PING } from '../constants/events';

const parseEvent = (next, response) => {
  const { event, payload } = JSON.parse(response.data);

  const handlers = {
    [CONNECTION_ESTABLISHED]() {
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
