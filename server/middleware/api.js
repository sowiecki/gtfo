/* eslint no-console:0, callback-return:0 */
import http from 'http';

import configureAccessories from '../controllers/helpers/configure-accessories';
import { FETCH_ROOM_RESERVATIONS } from '../ducks/rooms';

const fetchRoomReservations = (next, action) => {
  const { room, accessories } = action;
  const source = `${FETCH_ROOM_RESERVATIONS}${room.outlookAccount}`;

  // Retrieve outlook room reservation statuses
  http.get(source, (response) => {
    response.on('data', (data) => {
      const newRoomState = JSON.parse(data.toString('utf8'));

      // Configure room accessories according to room state
      configureAccessories(room, newRoomState, accessories);

      // Probably not doing anything in this scope
      return newRoomState;
    });
  }).on('error', (error) => {
    const errorMessage = `Failed to fetch room reservations
                          for ${room.outlookAccount}. \n
                          ${error}`;

    console.log(errorMessage);
  });
};

export default () => (next) => (action) => {
  switch (action.type) {
    case FETCH_ROOM_RESERVATIONS:
      fetchRoomReservations(next, action);
      // TODO fix not returning state here
      break;

    default:
      next(action);
      break;
  }
};
