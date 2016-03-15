/* eslint no-use-before-define:0 */
import { RED,
         TEAL,
         GREEN,
         ORANGE,
         ONE_MINUTE_STROBE,
         FIVE_MINUTE_STROBE,
         FAINT_LIGHT_LEVEL } from '../constants';

export const vacant = (led) => {
  led.stop(); // Prevent rogue strobing
  led.intensity(FAINT_LIGHT_LEVEL);
  led.color(GREEN);
};

export const occupied = (led) => {
  led.stop(); // Prevent rogue strobing
  led.intensity(FAINT_LIGHT_LEVEL);
  led.color(TEAL);
};

export const oneMinuteWarning = (led) => {
  led.color(RED);
  led.strobe(ONE_MINUTE_STROBE);
};

export const fiveMinuteWarning = (led) => {
  led.color(ORANGE);
  led.strobe(FIVE_MINUTE_STROBE);
};
