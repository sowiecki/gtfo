import path from 'path';
import { readFileSync } from 'fs';
import { every, forEach, isString, isObject } from 'lodash';

import { FileValidationError } from './errors';

/**
 * Quick and dirty file validations.
 * TODO - devices and roomCoordinates
 */

const readFile = (fileName) => {
  const filePath = path.join('./environment', fileName);

  return JSON.parse(readFileSync(filePath));
};

export const { markers } = readFile('markers.json', 'utf8');
export const { devices } = readFile('devices.json', 'utf8');
export const { roomCoordinates } = readFile('room-coordinates.json', 'utf8');

const markerIsValid = (marker) => {
  const { name, location, type, coordinates } = marker;

  const validations = [
    isString(name),
    isString(location),
    isString(type),
    isObject(coordinates)
  ];

  return every(validations, (validation) => validation);
};

forEach(markers, (marker) => {
  if (markerIsValid(marker)) {
    return;
  } else {
    throw new FileValidationError('markers');
  }
});
