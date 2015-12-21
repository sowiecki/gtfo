import moment from 'moment';

import {
  VACANT,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING,
  BOOKED
} from '../../constants/room-statuses';

const minutesFromNow = (minutes) => moment().add(minutes, 'minutes').toISOString();

const setAlertByReservationStatus = (reservations) => {
  const firstMeeting = reservations[0];
  const secondMeeting = reservations[1];

  // Reservation conditions
  const noReservations = reservations.length === 0;
  const currentlyReserved = moment(firstMeeting.endDate).isAfter(minutesFromNow(5));
  const reservationUpInOne = moment(firstMeeting.endDate).isBefore(minutesFromNow(1));
  const reservationUpInFive = moment(firstMeeting.endDate).isBefore(minutesFromNow(5));
  const nextMeetingStartingSoon = moment(secondMeeting.startDate).isBefore(minutesFromNow(5));
  const oneMinuteWarning = reservationUpInOne && nextMeetingStartingSoon;
  const fiveMinuteWarning = reservationUpInFive && nextMeetingStartingSoon;

  if (noReservations) {
    return VACANT;
  } else if (oneMinuteWarning) {
    return ONE_MINUTE_WARNING;
  } else if (fiveMinuteWarning) {
    return FIVE_MINUTE_WARNING;
  } else if (currentlyReserved) {
    return BOOKED;
  }
};

export default setAlertByReservationStatus;
