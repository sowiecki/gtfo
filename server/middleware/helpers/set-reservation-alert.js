/* eslint max-statements:0 */
import moment from 'moment';

import {
  VACANT,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING,
  BOOKED
} from '../../constants/room-statuses';

const minutesFromNow = (minutes) => moment().add(minutes, 'minutes').toISOString();

const setAlertByReservationStatus = (room, reservations = []) => {
  let alert;

  const firstMeeting = reservations[0];
  const secondMeeting = reservations[1];

  // Reservation conditions
  const noMeetingWithinFive = moment(firstMeeting.startDate).isAfter(minutesFromNow(5));
  const currentlyVacant = reservations.length === 0 || noMeetingWithinFive;
  const currentlyReserved = moment(firstMeeting.endDate).isAfter(minutesFromNow(5));
  const reservationUpInOne = moment(firstMeeting.endDate).isBefore(minutesFromNow(1));
  const reservationUpInFive = moment(firstMeeting.endDate).isBefore(minutesFromNow(5));
  // Should only run when secondMeeting.startDate is defined
  const checkUpcomingMeeting = () => moment(secondMeeting.startDate).isBefore(minutesFromNow(5));
  const nextMeetingStartingSoon = secondMeeting ? checkUpcomingMeeting() : false;
  const oneMinuteWarning = reservationUpInOne && nextMeetingStartingSoon;
  const fiveMinuteWarning = reservationUpInFive || nextMeetingStartingSoon;

  if (currentlyVacant && !nextMeetingStartingSoon) {
    alert = VACANT;
  } else if (oneMinuteWarning) {
    alert = ONE_MINUTE_WARNING;
  } else if (fiveMinuteWarning) {
    alert = FIVE_MINUTE_WARNING;
  } else if (currentlyReserved) {
    alert = BOOKED;
  }

  room.alert = alert;

  return room;
};

export default setAlertByReservationStatus;
