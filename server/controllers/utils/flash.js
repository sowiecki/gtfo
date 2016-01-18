/* eslint no-use-before-define:0 */
/* globals clearInterval, setInterval */
import { IN, OUT } from '../../constants/values';
import { RED, TEAL, GREEN, ORANGE } from '../../constants/colors';

// Keep leds low so as to not disturb occupants
const faint = 25;
let flashInterval;

// NOTE May not need this, will probably delete in the future
// const flash = (led, maxIntensity = 100, rate = 5) => {
//   let fadeDirection = IN;
//   let intensity = maxIntensity;
//
//   flashInterval = setInterval(() => {
//     switch (intensity) {
//       case 0:
//         fadeDirection = IN;
//         break;
//       case maxIntensity:
//         fadeDirection = OUT;
//         break;
//     }
//
//     switch (fadeDirection) {
//       case IN:
//         intensity += 1;
//         break;
//       case OUT:
//         intensity -= 1;
//         break;
//     }
//
//     led.intensity(intensity);
//   }, rate);
// };

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
  led.strobe(400)
};

export const fiveMinuteWarning = (led) => {
  led.color(ORANGE);
  led.strobe(200)
};
