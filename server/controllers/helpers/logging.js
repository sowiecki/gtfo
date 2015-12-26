export const logRoomNotification = (roomStatus) => {
  const statusMessages = {
    VACANT: `${roomStatus.outlookAccount} is vacant for at least 30 minutes`,
    ONE_MINUTE_WARNING: `${roomStatus.outlookAccount} has 1 minute left on current reservation`,
    FIVE_MINUTE_WARNING: `${roomStatus.outlookAccount} has 5 minutes left on current reservation`,
    BOOKED: `${roomStatus.outlookAccount} is currently booked`
  };

  console.log(statusMessages[roomStatus.alert]);
};
