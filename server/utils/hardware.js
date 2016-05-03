import Particle from 'particle-io';
import { Board,
         Led,
         Piezo,
         Thermometer,
         Motion } from 'johnny-five';
import { RGB_PINS,
         PIEZO_PIN,
         MCP9808,
         THERMO_FREQ,
         HCSR501,
         MOTION_PIN,
         MOTION_FREQ } from '../constants';

export const registerBoard = (device) => (
  new Board({
    io: new Particle({
      token: device.deviceAuthToken,
      deviceId: device.deviceId
    }),
    repl: false
  })
);

export const registerLed = (board) => (
  new Led.RGB({
    pins: RGB_PINS,
    id: board.id,
    board
  })
);

export const registerPiezo = (board) => (
  new Piezo({
    pin: PIEZO_PIN,
    id: board.id,
    board
  })
);

export const registerThermo = (board) => (
  new Thermometer({
    controller: MCP9808,
    freq: THERMO_FREQ,
    id: board.id,
    board
  })
);

export const registerMotion = (board) => (
  new Motion({
    controller: HCSR501,
    pin: MOTION_PIN,
    id: board.id,
    freq: MOTION_FREQ,
    board
  })
);
