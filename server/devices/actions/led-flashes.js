import temporal from 'temporal';

import {
  IN,
  OUT
} from '../constants/values';

import {
  // RED,
  PURPLE
} from '../constants/colors';

export const flashOne = (led) => {
  led.color(PURPLE);

  let intensity = 100;
  let fadeDirection = IN;

  // temporal.loop(6, () => {
  //   switch (intensity) {
  //     case 0:
  //       fadeDirection = IN;
  //       break;
  //     case 100:
  //       fadeDirection = OUT;
  //       break;
  //   }
  //
  //   switch (fadeDirection) {
  //     case IN:
  //       intensity += 1;
  //       break;
  //     case OUT:
  //       intensity -= 1;
  //       break;
  //   }
  //
  //   // console.log(`intensity: ${intensity} \n fadeDirection: ${fadeDirection}`);
  //
  //   led.intensity(intensity);
  // });
};
