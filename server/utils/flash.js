/* eslint no-use-before-define:0 */
import { STATUS_COLORS,
         ONE_MINUTE_STROBE,
         FIVE_MINUTE_STROBE,
         FAINT_LIGHT_LEVEL,
         FULL_LIGHT_LEVEL } from '../constants';

export const squatted = (led) => {
  led.stop(); // Prevent rogue strobing
  led.intensity(FAINT_LIGHT_LEVEL);
  led.color(STATUS_COLORS.SQUATTED);
};

export const vacant = (led) => {
  led.stop(); // Prevent rogue strobing
  led.intensity(FAINT_LIGHT_LEVEL);
  led.color(STATUS_COLORS.VACANT);
};

export const booked = (led) => {
  led.stop(); // Prevent rogue strobing
  led.intensity(FAINT_LIGHT_LEVEL);
  led.color(STATUS_COLORS.OCCUPIED);
};

export const oneMinuteWarning = (led) => {
  led.intensity(FULL_LIGHT_LEVEL);
  led.color(STATUS_COLORS.ONE_MINUTE_STROBE);
  led.strobe(ONE_MINUTE_STROBE);
};

export const fiveMinuteWarning = (led) => {
  led.intensity(FULL_LIGHT_LEVEL);
  led.color(STATUS_COLORS.FIVE_MINUTE_WARNING);
  led.strobe(FIVE_MINUTE_STROBE);
};
