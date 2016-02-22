/* eslint no-console:0 */
import * as flash from './flash';
import { VACANT,
         ONE_MINUTE_WARNING,
         FIVE_MINUTE_WARNING,
         BOOKED } from '../constants/room-statuses';

/**
 * Sends command to board LED to flash room status color.
 * @param {string} roomStatus Status of room.
 * @param {object} accessories Board accessories object.
 * @returns {undefined}
 */
export const flashNotifications = (roomStatus, accessories) => {
  // TODO better handling of no reservations left
  if (!roomStatus) {
    return;
  }

  const handleFlash = {
    [VACANT]: () => flash.vacant(accessories.led),

    [ONE_MINUTE_WARNING]: () => flash.oneMinuteWarning(accessories.led),

    [FIVE_MINUTE_WARNING]: () => flash.fiveMinuteWarning(accessories.led),

    [BOOKED]: () => flash.occupied(accessories.led)
  };

  handleFlash[roomStatus.alert || VACANT]();
};
