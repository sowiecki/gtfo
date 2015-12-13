// import moment from 'moment';
import temporal from 'temporal';

import { IN, OUT } from '../../constants/values';

import {
  RED,
  PURPLE,
  GREEN
} from '../../constants/colors';

export const flashVacant = (led) => {
  led.color(GREEN);
};


export const flashOccupied = (led) => {
  led.color(RED);

  let intensity = 100;
  let fadeDirection = IN;

  temporal.loop(10, () => {
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
