/* eslint no-use-before-define:0 */
import { RED, TEAL, GREEN, ORANGE } from '../../constants/colors';

// Keep leds low so as to not disturb occupants
const faint = 25;

export const vacant = (led) => {
  led.stop(); // Prevent rogue strobing
  led.intensity(faint);
  led.color(GREEN);
};

export const occupied = (led) => {
  led.stop(); // Prevent rogue strobing
  led.intensity(faint);
  led.color(TEAL);
};

export const oneMinuteWarning = (led) => {
  led.color(RED);
  led.strobe(400);
};

export const fiveMinuteWarning = (led) => {
  led.color(ORANGE);
  led.strobe(200);
};
