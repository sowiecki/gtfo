/* eslint max-statements:0 no-magic-numbers:0 */
import moment from 'moment';
import { isEmpty } from 'lodash';

import { filterExpiredReservations } from '../../universal/utils';
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
 * @param {array} reservations - Array of reservation objects.
 * @param {moment} recentMotion - Most recent time motion was detected.
 * @param {moment} now - Time to calculate alert on.
 * @returns {string} Room reservation alert.
 */
export const getRoomAlert = (reservations = [], recentMotion, time = moment()) => {
  const getTime = () => Object.assign(moment(time), {});
  const firstMeeting = reservations[0];
  const secondMeeting = reservations[1];
  const noReservations = !reservations.length;
  const hasRecentMotion = recentMotion ?
    recentMotion.isAfter(getTime().subtract(5, 'seconds')) : false;

  if (noReservations && !hasRecentMotion) {
    return VACANT;
  } else if (noReservations && hasRecentMotion) {
    return SQUATTED;
  }

  // Advanced reservation conditions
  const minutesFromNow = (minutes) => getTime().add(minutes, 'minutes');
  const noMeetingWithinFive = moment(firstMeeting.startDate).isAfter(minutesFromNow(5));
  const currentlyVacant = isEmpty(reservations) || noMeetingWithinFive;
  const currentlyReserved =
    time.isBetween(firstMeeting.startDate, firstMeeting.endDate, null, '[]');

  const nextMeetingStartingIn = (minutes) => {
    if (!secondMeeting) {
      return false;
    }

    const nextMeeting = !currentlyReserved ? firstMeeting : secondMeeting;

    return moment(nextMeeting.startDate).isBetween(time, minutesFromNow(minutes), null, '(]');
  };

  if (currentlyVacant && hasRecentMotion) {
    return SQUATTED;
  } else if (currentlyVacant) {
    return VACANT;
  } else if (nextMeetingStartingIn(1)) {
    return ONE_MINUTE_WARNING;
  } else if (nextMeetingStartingIn(5)) {
    return FIVE_MINUTE_WARNING;
  } else if (currentlyReserved) {
    return BOOKED;
  }

  return VACANT;
};

/**
 * Clones room without sensative properties before sending to clients.
 * @param {object} Room object.
 * @returns {object} Room object safe for public consumption.
 */
export const secureRoom = (room) => {
  // This crap is necessary or else Node throws a TypeError: Circular JSON error
  const thermo = room.thermo ? {
    C: room.thermo.C,
    F: room.thermo.F
  } : null;

  return {
    id: room.id,
    alert: room.alert,
    coordinates: room.coordinates,
    location: room.location,
    name: room.name,
    thermo
  };
};

/**
 * Clones rooms without sensative properties before sending to clients.
 * @param {array} Rooms array.
 * @returns {array} Rooms array safe for public consumption.
 */
export const secureRooms = (rooms) => [].concat(rooms).map(secureRoom);

/**
 * Determines future reservations based on provided time.
 * @param {array} rooms
 * @param {object} time - Moment object.
 * @returns {array} Meeting rooms as they would be in future time.
 */
export const getFutureAlerts = (rooms, time) => rooms.map((room) => {
  room.reservations = filterExpiredReservations(room.reservations, time);

  return {
    ...secureRoom(room),
    alert: getRoomAlert(room.reservations, false, time)
  };
});
