import Particle from 'particle-io';
import { Board,
         Led,
         Piezo,
         Thermometer,
         Motion } from 'johnny-five';
import { RGB_PINS,
         PIEZO_PIN,
         TMP36,
         THERMO_PIN,
         THERMO_FREQ,
         HCSR501,
         MOTION_PIN } from '../constants/values';

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
  });
};

export const registerThermo = (board) => {
  return new Thermometer({
    controller: TMP36,
    pin: THERMO_PIN,
    freq: THERMO_FREQ,
    id: board.id,
    board
  });
};

export const registerMotion = (board) => {
  return new Motion({
    controller: HCSR501,
    pin: MOTION_PIN,
    id: board.id,
    board
  });
};
