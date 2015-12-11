import moment from 'moment';
import temporal from 'temporal';

import { IN, OUT } from '../../constants/values';

import {
  RED,
  PURPLE,
  GREEN
} from '../../constants/colors';

const setLeds = (device, led, roomState) => {
  const firstMeeting = roomState[0];
  const secondMeeting = roomState[0];

  if (!firstMeeting || !Object.keys(firstMeeting).length) {
    // No current meeting, room is vacant
    console.log(`${device.outlookAccount} is vacant!`);
    led.color(GREEN);
  } else {
    console.log(`${device.outlookAccount} is currently booked!`);
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
  }
};

export default setLeds;
