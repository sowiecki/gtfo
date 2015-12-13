import { flashVacant, flashOccupied } from './set-leds';

const configureAccessories = (device, roomState, accessories) => {
  const firstMeeting = roomState[0];
  const secondMeeting = roomState[1];

  if (!firstMeeting || !Object.keys(firstMeeting).length) {
    // No current meeting, room is vacant
    console.log(`${device.outlookAccount} is vacant`);

    flashVacant(accessories.led);
  } else {
    // Room is currently booked
    console.log(`${device.outlookAccount} is currently booked`);

    flashOccupied(accessories.led);
  }

  // TODO logic to determine reservation nearing end
};

export default configureAccessories;
