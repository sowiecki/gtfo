import moment from 'moment';
import colors from 'colors/safe';

import {
  flashUnreserved,
  flashOccupied,
  flashFiveMinuteWarning,
  flashOneMinuteWarning
} from './helpers/set-leds';
import {
  VACANT,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING,
  BOOKED
} from '../constants/room-statuses';

const configureAccessories = (roomStatus, accessories) => {
  switch (roomStatus.alert) {
    case VACANT:
      console.log(`${roomStatus.outlookAccount} has no upcoming reservations`);

      flashUnreserved(accessories.led);
      break;

    case ONE_MINUTE_WARNING:
      console.log(`${roomStatus.outlookAccount} has 1 minute left on current reservation`);

      flashOneMinuteWarning(accessories.led);
      break;

    case FIVE_MINUTE_WARNING:
      console.log(`${roomStatus.outlookAccount} has 5 minutes left on current reservation`);

      flashFiveMinuteWarning(accessories.led);
      break;

    case BOOKED:
      console.log(`${roomStatus.outlookAccount} is currently booked`);

      flashOccupied(accessories.led);
      break;
  }
};

export default configureAccessories;
