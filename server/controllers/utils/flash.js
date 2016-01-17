/* eslint no-use-before-define:0 */
/* globals clearInterval, setInterval */
import { IN, OUT } from '../../constants/values';
import { RED, TEAL, GREEN, ORANGE } from '../../constants/colors';

// Keep leds low so as to not disturb occupants
const faint = 25;
let flashInterval;

const flash = (led, maxIntensity = 100, rate = 5) => {
  let fadeDirection = IN;
  let intensity = maxIntensity;

  flashInterval = setInterval(() => {
    switch (intensity) {
      case 0:
        fadeDirection = IN;
        break;
      case maxIntensity:
        fadeDirection = OUT;
        break;
    }

    switch (fadeDirection) {
      case IN:
        intensity += 1;
        break;
      case OUT:
        intensity -= 1;
        break;
    }

    led.intensity(intensity);
  }, rate);
};

export const vacant = (led) => {
  clearInterval(flashInterval);

  led.intensity(faint);
  led.color(GREEN);
};

export const occupied = (led) => {
  clearInterval(flashInterval);

  led.intensity(faint);
  led.color(TEAL);
};

export const oneMinuteWarning = (led) => {
  clearInterval(flashInterval);

  led.color(RED);
  flash(led, 100, 5);
};

export const fiveMinuteWarning = (led) => {
  clearInterval(flashInterval);

  led.color(ORANGE);
  flash(led, 25, 15);
};
