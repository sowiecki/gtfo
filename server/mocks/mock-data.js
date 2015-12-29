import colors from 'colors';
import { lstatSync, readFileSync, writeFileSync } from 'fs';
import moment from 'moment';
import { every, map, pluck } from 'lodash/collection';
import { flatten } from 'lodash/array';

import {
  MOCK_DATA_FILE,
  RESERVATIONS_PER_DAY,
  START_OF_DAY
} from './constants';
import {
  randomMeetingDuration,
  randomReservationGap,
  generateMockEmail,
  generateMockReservation
} from './utils';

const devices = JSON.parse(readFileSync('./devices.json', 'utf8')).devices;
const mockData = {};
const mockRooms = pluck(devices, 'outlookAccount');

const generateMockData = () => {
  // Generate reservations for each room
  mockRooms.forEach((room) => {
    let beginTimeOffset = moment(START_OF_DAY).minutes();
    let endTimeOffset = beginTimeOffset + randomMeetingDuration();
    mockData[room] = [];

    // Increment reservation times
    for (let i = 0; i < RESERVATIONS_PER_DAY; i++) {
      mockData[room].push(generateMockReservation(room, beginTimeOffset, endTimeOffset));

      beginTimeOffset = endTimeOffset + randomReservationGap();
      endTimeOffset = beginTimeOffset + randomMeetingDuration();
    }
  });

  writeFileSync(MOCK_DATA_FILE, JSON.stringify(mockData, null, 2));
};

const getMockData = () => {
  let mockData;

  try {
    mockData = JSON.parse(readFileSync(MOCK_DATA_FILE, 'utf8'));

    if (lstatSync(MOCK_DATA_FILE).isFile()) {
      // Check that mock data's meeting dates take place on today's date
      const allReservations = flatten(map(mockData, (room) => pluck(room, 'startDate')));

      // Validate that each reservation is for today
      const current = every(allReservations, (startDate) => {
        return moment().calendar(startDate, {sameDay: '[Today]'}) === 'Today';
      });

      if (!current) {
        console.log(colors.yellow('Mock data out-of-date, generating new one.'));

        generateMockData();
      }
    }
  }
  catch (e) {
    console.log(colors.yellow('No mock-data.json present, generating new one.'));

    generateMockData();
  }

  return mockData;
};

export default getMockData();
