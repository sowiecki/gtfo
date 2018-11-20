/* eslint array-callback-return:0 */
import path from 'path';
import { readFileSync } from 'fs';
import { merge, mapKeys } from 'lodash';

import validator from './validation';
import mockEnvironment from './mock';

class FileValidationError extends Error {
  constructor(fileName) {
    super(fileName);
    this.name = this.constructor.name;
    this.message = `Invalid ${fileName}.json!
      \nCheck the documentation for how to create and correctly format ${fileName}.json.\n`;
  }
}

const readFile = (fileName) => {
  const filePath = path.join('./environment', fileName);

  return JSON.parse(readFileSync(filePath, 'utf8'));
};

/**
 * Reads and validates user-configured JSON environment files.
 *
 * Testing environments may not have these files set up.
 * Mocked values are returned so that tests do not crash.
 *
 * @returns {object} config, devices, markers, coordinates
 */
const getEnvironment = () => {
  if (process.env.NODE_ENV === 'test') {
    return mockEnvironment;
  }

  const { config } = readFile('config.json');
  const { devices } = readFile('devices.json');
  const { markers } = readFile('markers.json');
  const coordinates = readFile('coordinates.json');

  if (validator.validate(config, '/ConfigSchema').errors.length) {
    throw new FileValidationError('config');
  }

  if (validator.validate(devices, '/DevicesSchema').errors.length) {
    throw new FileValidationError('devices');
  }

  if (validator.validate(markers, '/MarkersSchema').errors.length) {
    throw new FileValidationError('markers');
  }

  if (validator.validate({ coordinates }, '/CoordinatesSchema').errors.length) {
    throw new FileValidationError('coordinates');
  }

  coordinates.rooms = mapKeys(coordinates.rooms, (value, key) => key.toLowerCase());
  coordinates.stalls = mapKeys(coordinates.stalls, (value, key) => key.toLowerCase());

  const environment = {
    config,
    devices,
    markers,
    coordinates
  };

  if (process.env.MOCKS) {
    return merge(environment, mockEnvironment);
  }

  return environment;
};

export const { config, devices, markers, coordinates } = getEnvironment();
