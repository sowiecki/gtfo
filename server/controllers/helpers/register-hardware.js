import Particle from 'particle-io';
import { Board, Led, Piezo, Thermometer } from 'johnny-five';
import { RGB_PINS, PIEZO_PIN, THERMO_PIN, TMP36 } from '../../constants/values';

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
    pins: RGB_PINS,
    id: board.id,
    board
  });
};

export const registerPiezo = (board) => {
  return new Piezo({
    pin: PIEZO_PIN,
    id: board.id,
    board
  })
};

export const registerThermo = (board) => {
  return new Thermometer({
    controller: TMP36,
    pin: THERMO_PIN,
    id: board.id,
    board
  });
};
