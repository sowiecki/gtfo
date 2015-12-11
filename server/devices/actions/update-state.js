export const initializeDeviceState = (state, device) => {
  state[device.outlookAccount] = {};
};

export const updateDeviceState = (state, device, newState) => {
  console.log(newState);
};
