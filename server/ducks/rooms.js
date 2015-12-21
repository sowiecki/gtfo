import fs from 'fs';

import mockRoomData from '../mocks/mock-data';
import determineRoomStatus from '../controllers/determine-room-status';
import configureAccessories from '../controllers/configure-accessories';

const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;

export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';

const reducer = (state = devices, action) => {
  switch (action.type) {
    case MOCK_ROOM_RESERVATIONS:
      const { room, accessories } = action;
      const reservations = mockRoomData[room.outlookAccount];

      const roomWithStatus = determineRoomStatus(room, reservations, accessories);
      configureAccessories(roomWithStatus, accessories);

      return roomWithStatus;

    default:
      return state;
  }
};

export default reducer;
