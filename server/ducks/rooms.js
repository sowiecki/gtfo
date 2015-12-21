import fs from 'fs';

import mockRoomData from '../mocks/mock-data';
import configureAccessories from '../controllers/helpers/configure-accessories';

const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;

export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';

const reducer = (state = devices, action) => {
  switch (action.type) {
    case MOCK_ROOM_RESERVATIONS:
      const { room, accessories } = action;
      const newRoomState = mockRoomData[room.outlookAccount];

      configureAccessories(room, newRoomState, accessories);

      return newRoomState;
    default:
      return state;
  }
};

export default reducer;
