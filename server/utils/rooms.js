/* eslint max-statements:0 no-magic-numbers:0 */
import moment from 'moment';
import { isEmpty } from 'lodash';

import {
  SQUATTED,
  VACANT,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING,
  BOOKED
} from '../constants';

/**
 * Gets alert based on reservation times.
 * Assumes no reservation if start and end times are in the past!
 * @param {array} reservations Array of reservation objects.
 * @returns {string} Room reservation alert.
 */
export const getRoomAlert = (reservations = [], hasRecentMotion) => {
  const firstMeeting = reservations[0];
  const secondMeeting = reservations[1];

  if (!reservations.length) {
    // No reservations left for today
    return VACANT;
  }

  // Advanced reservation conditions
  const minutesFromNow = (minutes) => moment().add(minutes, 'minutes').toISOString();
  const noMeetingWithinFive = moment(firstMeeting.startDate).isAfter(minutesFromNow(5));
  const currentlyVacant = isEmpty(reservations) || noMeetingWithinFive;
  const currentlyReserved = moment().isBetween(firstMeeting.startDate, firstMeeting.endDate);

  const nextMeetingStartingIn = (minutes) => {
    if (!secondMeeting) {
      return false;
    }

    const nextMeeting = !currentlyReserved ? firstMeeting : secondMeeting;

    return moment(nextMeeting.startDate).isSameOrBefore(minutesFromNow(minutes));
  };

  if (currentlyVacant) {
    return hasRecentMotion ? SQUATTED : VACANT;
  } else if (nextMeetingStartingIn(1)) {
    return ONE_MINUTE_WARNING;
  } else if (nextMeetingStartingIn(5)) {
    return FIVE_MINUTE_WARNING;
  } else if (currentlyReserved) {
    return BOOKED;
  }
};

/**
 * Clones room without sensative properties before sending to clients.
 * @param {object} Room object.
 * @returns {object} Room object safe for public consumption.
 */
export const secureRoom = (room) => ({
  id: room.id,
  alert: room.alert,
  coordinates: room.coordinates,
  location: room.location,
  name: room.name,
  fahrenheitTmpVoltage: room.fahrenheitTmpVoltage,
  celciusTmpVoltage: room.celciusTmpVoltage
});

/**
 * Clones rooms without sensative properties before sending to clients.
 * @param {array} Rooms array.
 * @returns {array} Rooms array safe for public consumption.
 */
export const secureRooms = (rooms) => [].concat(rooms).map(secureRoom);
