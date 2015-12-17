/* eslint no-console:0, callback-return:0 */
import http from 'http';

import configureAccessories from '../controllers/helpers/configure-accessories';
import { FETCH_ROOM_RESERVATIONS } from '../ducks/rooms';

const fetchRoomReservations = (next, action) => {
  let roomState;
  const { room, accessories } = action;
  const source = `${FETCH_ROOM_RESERVATIONS}${room.outlookAccount}`;

  // Retrieve outlook room reservation statuses
  http.get(source, (response) => {
    response.on('data', (data) => {
      roomState = JSON.parse(data.toString('utf8'));

      // Configure room accessories according to room state
      configureAccessories(room, roomState, accessories);
    });
  }).on('error', (error) => {
    const errorMessage = `Failed to fetch room reservations
                          for ${room.outlookAccount}. \n
                          ${error}`;

    console.log(errorMessage);
  });

  // TODO not sure if this is what we want to return
  return roomState;
};

export default () => (next) => (action) => {
  switch (action.type) {
    case FETCH_ROOM_RESERVATIONS:
      // TODO this needs serious attention
      // Need to actually update state and return that instead
      return fetchRoomReservations(next, action);

    default:
      next(action);
      break;
  }
};
