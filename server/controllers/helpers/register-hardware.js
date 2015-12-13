import Particle from 'particle-io';
import { Board, Led } from 'johnny-five';
import { PHOTON_PINS } from '../../constants/values';

export const registerBoard = (device) => {
  return new Board({
    io: new Particle({
      token: device.deviceAuthToken,
      deviceId: device.deviceId
    })
  });
};

export const registerLed = (board) => {
  return new Led.RGB({
    pins: PHOTON_PINS,
    id: board.id,
    board
  });
};
