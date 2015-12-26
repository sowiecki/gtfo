import fs from 'fs';
import moment from 'moment';
import { pluck, filter } from 'lodash/collection';

import {
  GAP_PROBABILITY,
  RESERVATIONS_PER_DAY,
  START_OF_DAY
} from './constants';

const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8')).devices;
const mockData = {};
const mockRooms = pluck(devices, 'outlookAccount');

const randomMeetingDuration = () => {
  // Most meetings are 30 minutes, some are 60 minutes, and rarely are they 90 minutes
  const durations = [30, 30, 30, 60, 60, 90];

  return durations[Math.floor(Math.random() * (durations.length - 0)) + 0];
};

const randomReservationGap = () => {
  const introduceGap = 3 >= Math.floor(Math.random() * (GAP_PROBABILITY - 0)) + 0;

  return introduceGap ? randomMeetingDuration() : 0;
};

const generateMockEmail = () => {
  const mockNames = [ 'BlakeHenderson', 'AliceMurphy', 'AdamDeMamp', 'JillianBelk', 'AndersHolmvik' ];
  const randomIndex = () => Math.floor(Math.random() * (mockNames.length - 0)) + 0;

  return `${mockNames[randomIndex()]}@slalom.com`;
};

const generateMockReservation = (room, beginTimeOffset, endTimeOffset) => ({
  'email': generateMockEmail(),
  'startDate': moment(START_OF_DAY).add(beginTimeOffset, 'minutes').toISOString(),
  'endDate': moment(START_OF_DAY).add(endTimeOffset, 'minutes').toISOString()
});

const generateMockData = () => {
  // Generate reservations for each room
  mockRooms.forEach((room, index) => {
    let beginTimeOffset = moment(START_OF_DAY).minutes();
    let endTimeOffset = beginTimeOffset + randomMeetingDuration();
    mockData[room] = [];

    // Increment reservation times
    for (let i = 0; i < RESERVATIONS_PER_DAY; i++) {
      mockData[room].push(generateMockReservation(room, beginTimeOffset, endTimeOffset));

      beginTimeOffset = endTimeOffset + randomReservationGap();
      endTimeOffset = beginTimeOffset + randomMeetingDuration();
    }

    // Filter expired reservations
    mockData[room] = filter(mockData[room], (reservation) => {
      const reservationNotExpired = !moment(reservation.endDate).isBefore(moment());

      return reservationNotExpired;
    });
  });

  return mockData;
};

export default generateMockData();
