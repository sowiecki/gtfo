import fs from 'fs';
import immutable from 'immutable';

const parsedDevices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;

export const EMIT_DEVICE_INIT = 'EMIT_DEVICE_INIT';

export const initializeDevices = () => ({ type: EMIT_DEVICE_INIT });

const devices = (state = parsedDevices, action) => {
  switch (action.type) {
    case EMIT_DEVICE_INIT:
      return parsedDevices;

    default:
      return state;
  }
};

export default devices;
