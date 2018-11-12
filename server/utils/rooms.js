/* eslint max-statements:0, no-magic-numbers:0 */
import moment from 'moment';
import { some, isEmpty } from 'lodash';

import { filterExpiredReservations } from '../../universal/utils';
import {
  SQUATTED,
  VACANT,
  ABANDONED,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING,
  BOOKED,
  MOTION_GRACE_PERIOD
} from '../constants';
import { config } from '../../environment';

/**
 * Gets alert based on reservation times.
 * Assumes no reservation if start and end times are in the past!
 * @param {array} properties - Properties of room.
 * @param {array} properties.reservations - Array of reservation objects.
 * @param {array} properties.recentMotion - Most recent time motion was detected.
 * @param {object} capabilities - Hardware capability flags of room's module.
 * @param {bool} capabilities.motion - Is room module motion forced to be enabled.
 * @param {moment} time - Time to calculate alert on.
 * @returns {string} Room reservation alert.
 */
export const getRoomAlert = (properties, capabilities, time = moment()) => {
  const reservations = properties.reservations || [];
  const { recentMotion } = properties;
  const isNotFutureQuery = time.isSameOrBefore(moment());
  const getTime = () => Object.assign(moment(time), {});
  const firstMeeting = reservations[0];
  const secondMeeting = reservations[1];
  const noReservations = !reservations.length;
  const moduleIsMotionEquipped = config.public.enableMotion === true || capabilities.motion;
  const shouldConsiderMotion = moduleIsMotionEquipped && isNotFutureQuery;
  const hasRecentMotion = shouldConsiderMotion && recentMotion
    ? recentMotion.isAfter(getTime().subtract(MOTION_GRACE_PERIOD, 'seconds'))
    : false;

  if (noReservations && !hasRecentMotion) {
    return VACANT;
  } else if (noReservations && hasRecentMotion) {
    return SQUATTED;
  }

  // Advanced reservation conditions
  const minutesFromNow = (minutes) => getTime().add(minutes, 'minutes');
  const noMeetingWithinFive = moment(firstMeeting.startDate).isAfter(minutesFromNow(5));
  const currentlyNotReserved = isEmpty(reservations) || noMeetingWithinFive;
  const currentlyReserved = time.isBetween(
    firstMeeting.startDate,
    firstMeeting.endDate,
    null,
    '[]'
  );

  const nextMeetingStartingIn = (minutes) => {
    if (!secondMeeting) {
      return false;
    }

    const nextMeeting = !currentlyReserved ? firstMeeting : secondMeeting;

    return moment(nextMeeting.startDate).isBetween(time, minutesFromNow(minutes), null, '(]');
  };

  if (shouldConsiderMotion && currentlyNotReserved && hasRecentMotion) {
    return SQUATTED;
  } else if (currentlyNotReserved) {
    return VACANT;
  } else if (nextMeetingStartingIn(1)) {
    return ONE_MINUTE_WARNING;
  } else if (nextMeetingStartingIn(5)) {
    return FIVE_MINUTE_WARNING;
  } else if (shouldConsiderMotion && !hasRecentMotion && currentlyReserved) {
    return ABANDONED;
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
  const thermo = room.thermo
    ? {
      c: room.thermo.c,
      f: room.thermo.f
    }
    : null;

  const currentReservation = room.reservations.find((reservation) =>
    moment().isBetween(moment(reservation.startDate), moment(reservation.endDate)));

  return {
    id: room.id,
    alert: room.alert,
    coordinates: room.coordinates,
    location: room.location,
    name: room.name,
    connectionStatus: room.connectionStatus,
    currentReservation,
    reservations: room.reservations,
    thermo
  };
};

/**
 * Clones rooms without sensative properties before sending to clients.
 * @param {array} Rooms array.
 * @returns {array} Rooms array safe for public consumption.
 */
export const secureRooms = (rooms) => [].concat(rooms).map(secureRoom);

export const getSecureRooms = (state) => secureRooms(state.toJS().rooms);

/**
 * Determines future reservations based on provided time.
 * @param {array} rooms
 * @param {object} time - Moment object.
 * @returns {array} Meeting rooms as they would be in future time.
 */
export const getFutureAlerts = (rooms, time) =>
  rooms.map((room) => {
    room.reservations = filterExpiredReservations(room.reservations, time);
    const roomProperties = { reservations: room.reservations, recentMotion: false };

    return {
      ...secureRoom(room),
      alert: getRoomAlert(roomProperties, room.capabilities, time)
    };
  });

/**
 * Sets up
 * @param {bool} connectionStatus
 * @param {object} room
 * @returns {object} room
 */
export const initializeRoomModuleState = (action, room) => {
  if (room.get('id') === action.room.get('id')) {
    room = room.set('connectionStatus', action.connectionStatus);
  }

  return room;
};

/**
 * Used to override publicConfig before sending to client
 * @param {array} rooms
 * @returns {bool}
 */
export const shouldOverrideMotion = (rooms) => some(rooms, 'capabilities.motion');
