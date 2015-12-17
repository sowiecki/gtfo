import fs from 'fs';
// import immutable from 'immutable';

import mockRoomData from '../../mock-data';
import configureAccessories from '../controllers/helpers/configure-accessories';

const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;

export const MOCK_ROOM_RESERVATIONS = 'MOCK_ROOM_RESERVATIONS';

const rooms = (state = devices, action) => {
  switch (action.type) {
    case MOCK_ROOM_RESERVATIONS:
      const { room, accessories } = action;
      const roomState = mockRoomData[room.outlookAccount];

      configureAccessories(room, roomState, accessories);
      return state;
    default:
      return state;
  }
};

export default rooms;
