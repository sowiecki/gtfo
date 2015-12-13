// import moment from 'moment';
import temporal from 'temporal';

import { IN, OUT } from '../../constants/values';
import {
  RED,
  PURPLE,
  GREEN
} from '../../constants/colors';

// Keep leds low so as to not disturb occupants
const faint = 15;

export const flashVacant = (led) => {
  led.intensity(faint);
  led.color(GREEN);
};

export const flashOccupied = (led) => {
  led.intensity(faint);
  led.color(PURPLE);
};

export const flashGTFO = (led) => {
  led.color(RED);

  let intensity = 100;
  let fadeDirection = IN;

  temporal.loop(5, () => {
    switch (intensity) {
      case 0:
        fadeDirection = IN;
        break;
      case 100:
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
