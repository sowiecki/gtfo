import temporal from 'temporal';

import {
  IN,
  OUT
} from '../constants/values';

import {
  RED,
  PURPLE,
  GREEN
} from '../constants/colors';

export const flashOne = (led, id) => {
  switch (id) {
    case '2c0021000547343339373536':
      led.color(RED);
      break;
    case '2a0021000247343337373739':
      led.color(PURPLE);
      break;
    case '3a001b000f47343432313031':
      led.color(GREEN);
      break;
  }

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
