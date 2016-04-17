/* eslint no-console:0 */
import * as flash from './flash';
import { SQUATTED,
         VACANT,
         ONE_MINUTE_WARNING,
         FIVE_MINUTE_WARNING,
         BOOKED } from '../constants';

/**
 * Sends command to board LED to flash room status color.
 * Does nothing --dd flag is set at runtime.
 * @param {string} room Status of room.
 * @param {object} accessories Board accessories object.
 * @returns {undefined}
 */
export const flashNotifications = (room, accessories = {}) => {
  if (process.env.DISABLE_DEVICES) {
    return;
  }

  const handleFlash = {
    [SQUATTED]: () => flash.squatted(accessories.led),

    [VACANT]: () => flash.vacant(accessories.led),

    [ONE_MINUTE_WARNING]: () => flash.oneMinuteWarning(accessories.led),

    [FIVE_MINUTE_WARNING]: () => flash.fiveMinuteWarning(accessories.led),

    [BOOKED]: () => flash.occupied(accessories.led)
  };

  handleFlash[room.alert || VACANT]();
};
