/* eslint no-console:0 */
import * as flash from './flash';
import { logRoomNotification } from './logging';
import {
  VACANT,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING,
  BOOKED
} from '../constants/room-statuses';

const mapNotifications = (roomStatus, accessories) => {
  // TODO better handling of no reservations left
  if (!roomStatus) {
    return;
  }

  logRoomNotification(roomStatus);

  const handleFlash = {
    [VACANT]: () => flash.vacant(accessories.led),

    [ONE_MINUTE_WARNING]: () => flash.oneMinuteWarning(accessories.led),

    [FIVE_MINUTE_WARNING]: () => flash.fiveMinuteWarning(accessories.led),

    [BOOKED]: () => flash.occupied(accessories.led)
  };

  handleFlash[roomStatus.alert || VACANT]();
};

export default mapNotifications;
