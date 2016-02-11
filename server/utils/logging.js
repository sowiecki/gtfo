/* eslint no-console:0 */
/* globals console */
import colors from 'colors';

export const logRoomNotification = ({ name, alert }) => {
  // Clear previous message in terminal
  process.stdout.clearLine();
  process.stdout.cursorTo(0);

  const statusMessages = {
    VACANT: `${name} is vacant for at least 30 minutes`,
    ONE_MINUTE_WARNING: `${name} has 1 minute left on current reservation`,
    FIVE_MINUTE_WARNING: `${name} has 5 minutes left on current reservation`,
    BOOKED: `${name} is currently booked`
  };

  const logColors = {
    VACANT: 'green',
    ONE_MINUTE_WARNING: 'red',
    FIVE_MINUTE_WARNING: 'yellow',
    BOOKED: 'cyan',
    OFFLINE: 'black'
  };

  const logColor = logColors[alert] || logColors.OFFLINE;
  const message = statusMessages[alert];

  console.log(colors[logColor](message));
};
