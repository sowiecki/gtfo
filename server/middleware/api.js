import socketController from '../controllers/socket';
import fetchRoomReservation from './fetch-room-reservation';
import fetchStallOccupancies from './fetch-stall-occupancies';

import { FETCH_ROOM_RESERVATIONS, EMIT_ROOM_PING_RECEIVED } from '../ducks/rooms';
import { FETCH_STALL_OCCUPANCIES } from '../ducks/stalls';
import { NEW_ROOM_PING } from '../constants';

export default () => (next) => (action) => {
  switch (action.type) {
    case FETCH_ROOM_RESERVATIONS:
      fetchRoomReservation(next, action);
      break;

    case FETCH_STALL_OCCUPANCIES:
      fetchStallOccupancies(next);
      break;

    case EMIT_ROOM_PING_RECEIVED:
      socketController.handle(NEW_ROOM_PING, action.ping);
      break;

    default:
      next(action);
      break;
  }
};
