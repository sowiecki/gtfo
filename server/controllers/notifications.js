/* eslint no-console:0 */
import * as flash from './utils/flash';
import { logRoomNotification } from './utils/logging';
import {
  VACANT,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING,
  BOOKED
} from '../constants/room-statuses';

const notificationsController = (roomStatus, accessories) => {
  // TODO better handling of no reservations left
  if (!roomStatus) {
    return;
  }

  logRoomNotification(roomStatus);

  switch (roomStatus.alert) {
    case VACANT:
      flash.vacant(accessories.led);
      break;

    case ONE_MINUTE_WARNING:
      flash.oneMinuteWarning(accessories.led);
      break;

    case FIVE_MINUTE_WARNING:
      flash.fiveMinuteWarning(accessories.led);
      break;

    case BOOKED:
      flash.occupied(accessories.led);
      break;
  }
};

export default notificationsController;
