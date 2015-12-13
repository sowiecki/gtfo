import moment from 'moment';
import colors from 'colors/safe';

import {
  flashUnreserved,
  flashOccupied,
  flashGTFO
} from './set-leds';

const minutesFromNow = (minutes) => moment().add(minutes, 'minutes').toISOString();

const configureAccessories = (device, roomState, accessories) => {
  const firstMeeting = roomState[0];
  const secondMeeting = roomState[1];

  const noReservations = roomState.length === 0;

  if (noReservations) {
    console.log(`${device.outlookAccount} has no upcoming reservations`);

    flashUnreserved(accessories.led);
    return;
  }

  // Room states
  const currentlyReserved = moment(firstMeeting.endDate).isAfter(minutesFromNow(5));
  const reservationNearEnd = moment(firstMeeting.endDate).isBefore(minutesFromNow(5));
  const nextMeetingStartingSoon = moment(secondMeeting.startDate).isBefore(minutesFromNow(5));

  const fiveMinuteWarning = reservationNearEnd && nextMeetingStartingSoon;

  if (fiveMinuteWarning) {
    console.log(`${device.outlookAccount} is transitioning to next reservation`);

    flashGTFO(accessories.led);
  } else if (currentlyReserved) {
    console.log(`${device.outlookAccount} is currently booked`);

    flashOccupied(accessories.led);
  }
};

export default configureAccessories;
