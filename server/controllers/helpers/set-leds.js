// import moment from 'moment';
import temporal from 'temporal';

import { IN, OUT } from '../../constants/values';
import {
  RED,
  PURPLE,
  DARK_PINK,
  GREEN
} from '../../constants/colors';

// Keep leds low so as to not disturb occupants
const faint = 15;

const flash = (led, maxIntensity = 100, rate = 5) => {
  let fadeDirection = IN;
  let intensity = maxIntensity;

  return temporal.loop(rate, () => {
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
  });
};

export const flashVacant = (led) => {
  led.intensity(faint);
  led.color(GREEN);
};

export const flashOccupied = (led) => {
  led.intensity(faint);
  led.color(PURPLE);
};

export const flashFiveMinuteWarning = (led) => {
  led.color(DARK_PINK);
  flash(led, 25, 15);
};

export const flashOneMinuteWarning = (led) => {
  led.color(RED);
  flash(led, 100, 5);
};
