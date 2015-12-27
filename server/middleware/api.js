import fetchRoomReservations from './fetch-room-reservation';
import fetchMockedReservations from './fetch-mocked-reservations';
import fetchRoomTemperature from './fetch-room-temperature';
import fetchRoomMotion from './fetch-room-motion';
import {
  MOCK_ROOM_RESERVATIONS,
  FETCH_ROOM_RESERVATIONS,
  FETCH_ROOM_TEMPERATURE,
  FETCH_ROOM_MOTION
} from '../ducks/rooms';

export default () => (next) => (action) => {
  switch (action.type) {
    case MOCK_ROOM_RESERVATIONS:
      fetchMockedReservations(next, action);
      break;

    case FETCH_ROOM_RESERVATIONS:
      fetchRoomReservations(next, action);
      break;

    case FETCH_ROOM_TEMPERATURE:
      fetchRoomTemperature(next, action);
      break;

    case FETCH_ROOM_MOTION:
      fetchRoomMotion(next, action);
      break;

    default:
      next(action);
      break;
  }
};
