/* eslint max-statements:0 no-magic-numbers:0 */
import moment from 'moment';
import { isEmpty } from 'lodash';

import {
  VACANT,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING,
  BOOKED
} from '../constants';

const minutesFromNow = (minutes) => moment().add(minutes, 'minutes').toISOString();

/**
 * Gets alert based on reservation times.
 * Assumes no reservation its start and end times in the past!
 * @param {array} reservations Array of reservation objects.
 * @returns {string} Room reservation alert.
 */
export const getRoomAlert = (reservations = []) => {
  // TODO Should determine meetings by comparing to current time
  const firstMeeting = reservations[0];
  const secondMeeting = reservations[1];

  if (!reservations.length) {
    // No reservations left for today
    return VACANT;
  }

  // Reservation conditions
  const noMeetingWithinFive = moment(firstMeeting.startDate).isAfter(minutesFromNow(5));
  const currentlyVacant = isEmpty(reservations) || noMeetingWithinFive;
  const currentlyReserved = moment().isBetween(firstMeeting.startDate, firstMeeting.endDate);

  const nextMeetingStartingIn = (minutes) => {
    const nextMeeting = currentlyReserved && secondMeeting ? secondMeeting : firstMeeting;

    return moment(nextMeeting.startDate).isSameOrBefore(minutesFromNow(minutes));
  };

  if (currentlyVacant && !nextMeetingStartingIn()) {
    return VACANT;
  } else if (nextMeetingStartingIn(1)) {
    return ONE_MINUTE_WARNING;
  } else if (nextMeetingStartingIn(5)) {
    return FIVE_MINUTE_WARNING;
  } else if (currentlyReserved) {
    return BOOKED;
  }
};
