/* eslint no-use-before-define:0 */
import { STATUS_COLORS } from '../constants';

export const squatted = (led) => {
  led.color(STATUS_COLORS.SQUATTED);
};

export const vacant = (led) => {
  led.color(STATUS_COLORS.VACANT);
};

export const booked = (led) => {
  led.color(STATUS_COLORS.OCCUPIED);
};

export const oneMinuteWarning = (led) => {
  led.color(STATUS_COLORS.ONE_MINUTE_WARNING);
};

export const fiveMinuteWarning = (led) => {
  led.color(STATUS_COLORS.FIVE_MINUTE_WARNING);
};
