import fs from 'fs';
import moment from 'moment';
import pluck from 'lodash/collection/pluck';

import {
  GAP_PROBABILITY,
  RESERVATIONS_PER_DAY,
  START_OF_DAY
} from './constants';

/**
 * All dates are ISO 8601
 */

const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;
const mockData = {};
const mockRooms = pluck(devices, 'outlookAccount');

const randomMeetingDuration = () => {
  const durations = [30, 30, 30, 40, 60, 60, 90];

  return durations[Math.floor(Math.random() * (durations.length - 0)) + 0];
};

const randomReservationGap = () => {
  const introduceGap = 3 >= Math.floor(Math.random() * (GAP_PROBABILITY - 0)) + 0;

  return introduceGap ? randomMeetingDuration() : 0;
};

const generateMockEmail = () => {
  const mockEmails = [
    'BlakeHenderson@slalom.com',
    'AliceMurphy@slalom.com',
    'AdamDeMamp@slalom.com',
    'JillianBelk@slalom.com',
    'AndersHolmvik@slalom.com'
  ];
  const randomIndex = () => Math.floor(Math.random() * (mockEmails.length - 0)) + 0;

  return mockEmails[randomIndex()];
};

const generateMockReservation = (room, beginTimeOffset, endTimeOffset) => {
  return {
    'email': generateMockEmail(),
    'startDate': moment(START_OF_DAY).add(beginTimeOffset, 'minutes').toISOString(),
    'endDate': moment(START_OF_DAY).add(endTimeOffset, 'minutes').toISOString()
  }
};

const generateMockData = () => {
  mockRooms.forEach((room, index) => {
    let beginTimeOffset = moment(START_OF_DAY).minutes();
    let endTimeOffset = beginTimeOffset + randomMeetingDuration();
    mockData[room] = [];

    for (let i = 0; i < RESERVATIONS_PER_DAY; i++) {
      mockData[room].push(generateMockReservation(room, beginTimeOffset, endTimeOffset));

      beginTimeOffset = endTimeOffset + randomReservationGap();
      endTimeOffset = beginTimeOffset + randomMeetingDuration();
    }
  });

  return mockData;
};

export default generateMockData();
