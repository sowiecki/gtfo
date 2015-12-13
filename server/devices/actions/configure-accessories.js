import colors from 'colors/safe';

import { flashUnreserved, flashOccupied } from './set-leds';

const configureAccessories = (device, roomState, accessories) => {
  const firstMeeting = roomState[0];
  const secondMeeting = roomState[1];

  const roomIsUnreserved = !firstMeeting || !Object.keys(firstMeeting).length;

  if (roomIsUnreserved) {
    console.log(`${device.outlookAccount} is currently ${colors.magenta('unreserved')}`);

    flashUnreserved(accessories.led);
  } else {
    console.log(`${device.outlookAccount} is currently ${colors.red('booked')}`);

    flashOccupied(accessories.led);
  }

  // TODO logic to determine reservation nearing end
};

export default configureAccessories;
