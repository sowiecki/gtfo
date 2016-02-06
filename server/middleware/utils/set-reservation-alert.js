/* eslint max-statements:0 no-magic-numbers:0 */
import moment from 'moment';
import isEmpty from 'lodash/lang/isEmpty';

import {
  VACANT,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING,
  BOOKED
} from '../../constants/room-statuses';

const minutesFromNow = (minutes) => moment().add(minutes, 'minutes').toISOString();

const setAlertByReservationStatus = (room, reservations = []) => {
  let alert;

  // TODO Should determine meetings by comparing to current time
  const firstMeeting = reservations[0];
  const secondMeeting = reservations[1];

  // No reservations left for today
  if (!reservations.length) {
    room.alert = VACANT;
    return room;
  }

  // Reservation conditions
  const noMeetingWithinFive = moment(firstMeeting.startDate).isAfter(minutesFromNow(5));
  const currentlyVacant = isEmpty(reservations) || noMeetingWithinFive;
  const currentlyReserved = moment(firstMeeting.endDate).isAfter(minutesFromNow(5));
  const reservationUpInOne = moment(firstMeeting.endDate).isBefore(minutesFromNow(1));
  const reservationUpInFive = moment(firstMeeting.endDate).isBefore(minutesFromNow(5));
  const nextMeetingStartingSoon = () => {
    if (!secondMeeting) {
      return false;
    }
    return moment(secondMeeting.startDate).isBefore(minutesFromNow(5));
  };
  const oneMinuteWarning = reservationUpInOne && nextMeetingStartingSoon();
  const fiveMinuteWarning = reservationUpInFive && nextMeetingStartingSoon();

  if (currentlyVacant && !nextMeetingStartingSoon()) {
    alert = VACANT;
  } else if (oneMinuteWarning && nextMeetingStartingSoon()) {
    alert = ONE_MINUTE_WARNING;
  } else if (fiveMinuteWarning && nextMeetingStartingSoon()) {
    alert = FIVE_MINUTE_WARNING;
  } else if (currentlyReserved) {
    alert = BOOKED;
  }

  room.alert = alert;

  return room;
};

export default setAlertByReservationStatus;
