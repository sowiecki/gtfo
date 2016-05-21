import { EMIT_HANDSHAKE_RECEIVED } from '../ducks/navigation';
import { EMIT_ROOM_STATUSES_UPDATE,
         EMIT_ROOM_TEMPERATURE_UPDATE,
         EMIT_ROOM_MOTION_UPDATE,
         EMIT_SET_ROOM_PING,
         EMIT_MARKERS_UPDATE,
         EMIT_STALL_OCCUPANCIES_UPDATE,
         EMIT_CLEAR_CONNECTION_ERRORS } from '../ducks/layout';
import { HANDSHAKE,
         INITIALIZE_ROOMS,
         INITIALIZE_MARKERS,
         INITIALIZE_STALLS,
         RECONNECTED,
         ROOM_STATUSES_UPDATE,
         NEW_ROOM_PING,
         ROOM_TEMPERATURE_UPDATE,
         ROOM_MOTION_UPDATE,
         STALL_OCCUPANCIES_UPDATE,
         TIME_TRAVEL_UPDATE } from '../constants';

const parseEvent = (next, response) => {
  const { event, payload } = JSON.parse(response.data);

  const handlers = {
    [HANDSHAKE]() {
      next({
        type: EMIT_HANDSHAKE_RECEIVED,
        config: payload
      });
    },

    [INITIALIZE_ROOMS]() {
      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        meetingRooms: payload
      });
    },

    [ROOM_STATUSES_UPDATE]() {
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

    [INITIALIZE_STALLS]() {
      next({
        type: EMIT_STALL_OCCUPANCIES_UPDATE,
        stalls: payload
      });
    },

    [STALL_OCCUPANCIES_UPDATE]() {
      next({
        type: EMIT_STALL_OCCUPANCIES_UPDATE,
        stalls: payload
      });
    },

    [RECONNECTED]() {
      next({ type: EMIT_CLEAR_CONNECTION_ERRORS });
    },

    [ROOM_TEMPERATURE_UPDATE]() {
      next({
        type: EMIT_ROOM_TEMPERATURE_UPDATE,
        room: payload
      });
    },

    [ROOM_MOTION_UPDATE]() {
      next({
        type: EMIT_ROOM_MOTION_UPDATE,
        room: payload
      });
    },

    [NEW_ROOM_PING]() {
      next({
        type: EMIT_SET_ROOM_PING,
        ping: payload
      });
    },

    [TIME_TRAVEL_UPDATE]() {
      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        meetingRooms: payload
      });
    }
  };

  handlers[event]();
};

export default parseEvent;
