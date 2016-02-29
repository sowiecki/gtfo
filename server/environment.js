import path from 'path';
import { readFileSync } from 'fs';

import validator from '../environment/validation';
import { FileValidationError } from './errors';

const readFile = (fileName) => {
  const filePath = path.join('./environment', fileName);

  return JSON.parse(readFileSync(filePath, 'utf8'));
};

export const { markers } = readFile('markers.json');
export const { devices } = readFile('devices.json');
export const { coordinates } = readFile('coordinates.json');

if (validator.validate(devices, '/DevicesSchema').errors.length) {
  throw new FileValidationError('devices');
}

if (validator.validate(markers, '/MarkersSchema').errors.length) {
  throw new FileValidationError('markers');
}

if (validator.validate(coordinates, '/CoordinatesSchema').errors.length) {
  throw new FileValidationError('coordinates');
}
