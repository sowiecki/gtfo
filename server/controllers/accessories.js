/* eslint no-console:0 */
import * as flash from './helpers/flash';
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

      flash.unreserved(accessories.led);
      break;

    case ONE_MINUTE_WARNING:
      console.log(`${roomStatus.outlookAccount} has 1 minute left on current reservation`);

      flash.oneMinuteWarning(accessories.led);
      break;

    case FIVE_MINUTE_WARNING:
      console.log(`${roomStatus.outlookAccount} has 5 minutes left on current reservation`);

      flash.fiveMinuteWarning(accessories.led);
      break;

    case BOOKED:
      console.log(`${roomStatus.outlookAccount} is currently booked`);

      flash.occupied(accessories.led);
      break;
  }
};

export default configureAccessories;
