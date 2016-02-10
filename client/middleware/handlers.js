import { EMIT_ROOM_STATUSES_UPDATE,
         EMIT_SET_ROOM_PING } from '../ducks/layout';
import { CONNECTION_ESTABLISHED,
         ROOM_STATUSES_UPDATE,
         NEW_ROOM_PING } from '../constants/events';

const handleEvent = (next, response) => {
  const { event, payload } = JSON.parse(response.data);

  switch (event) {
    case CONNECTION_ESTABLISHED:
      break;
    case ROOM_STATUSES_UPDATE:
      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        meetingRooms: payload
      });

      break;
    case NEW_ROOM_PING:
      next({
        type: EMIT_SET_ROOM_PING,
        ping: payload
      })

      break;
  }
};

export default handleEvent;
