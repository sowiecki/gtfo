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
  const currentlyVacant = reservations.length === 0 || moment(firstMeeting.startDate).isAfter(minutesFromNow(30));
  const currentlyReserved = moment(firstMeeting.endDate).isAfter(minutesFromNow(5));
  const reservationUpInOne = moment(firstMeeting.endDate).isBefore(minutesFromNow(1));
  const reservationUpInFive = moment(firstMeeting.endDate).isBefore(minutesFromNow(5));
  const nextMeetingStartingSoon = secondMeeting ? moment(secondMeeting.startDate).isBefore(minutesFromNow(5)) : false;
  const oneMinuteWarning = reservationUpInOne && nextMeetingStartingSoon;
  const fiveMinuteWarning = reservationUpInFive && nextMeetingStartingSoon;

  if (currentlyVacant) {
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
