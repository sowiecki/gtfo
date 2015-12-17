import http from 'http';

import configureAccessories from '../controllers/helpers/configure-accessories';
import { FETCH_ROOM_RESERVATIONS } from '../ducks/rooms';

const fetchRoomReservations = (next, device) => {
  const source = `${HOST}${FETCH_ROOM_RESERVATIONS}${device.outlookAccount}`;

  // Retrieve outlook room reservation statuses
  http.get(source, (response) => {
    response.on('data', (data) => {
      const roomState = JSON.parse(data.toString('utf8'));

      // Configure device accessories according to room state
      configureAccessories(device, roomState, accessories);
    });
  }).on('error', (error) => {
    const errorMessage = `Failed to fetch room reservations
                          for ${device.outlookAccount}. \n
                          ${error}`;

    console.log(errorMessage);
  });
};

export default () => (next) => (action) => {
  switch (action.type) {
    case FETCH_ROOM_RESERVATIONS:
      return fetchRoomReservations;

    default:
      next(action);
      break;
  }
};
