import colors from 'colors';

/* eslint no-console:0 */
/* globals console */
export const logRoomNotification = (roomStatus) => {
  // Clear previous message in terminal
  process.stdout.clearLine();
  process.stdout.cursorTo(0);

  const statusMessages = {
    VACANT: `${roomStatus.name} is vacant for at least 30 minutes`,
    ONE_MINUTE_WARNING: `${roomStatus.name} has 1 minute left on current reservation`,
    FIVE_MINUTE_WARNING: `${roomStatus.name} has 5 minutes left on current reservation`,
    BOOKED: `${roomStatus.name} is currently booked`
  };

  const logColors = {
    VACANT: 'green',
    ONE_MINUTE_WARNING: 'red',
    FIVE_MINUTE_WARNING: 'orange',
    BOOKED: 'cyan',
    OFFLINE: 'black'
  };

  const logColor = logColors[roomStatus.alert] || logColors[OFFLINE];

  console.log(colors[logColor](statusMessages[roomStatus.alert]));
};
