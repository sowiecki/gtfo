/* eslint no-console:0 */
/* globals console */
import colors from 'colors';
import moment from 'moment';
// import ora from 'ora';

// import { SPINNER_DELAY } from '../constants';

/**
 * Logs individual room status.
 * @param {object} room Room object with name and alert.
 * @returns {undefined}
 */
const logRoomStatus = ({ name, alert }) => {
  const statusMessages = {
    VACANT: `${name} is vacant for at least 30 minutes`,
    ONE_MINUTE_WARNING: `${name} has 1 minute left on current reservation`,
    FIVE_MINUTE_WARNING: `${name} has 5 minutes left on current reservation`,
    BOOKED: `${name} is currently booked`,
    OFFLINE: `${name} is offline`
  };

  const logColors = {
    VACANT: 'green',
    ONE_MINUTE_WARNING: 'red',
    FIVE_MINUTE_WARNING: 'yellow',
    BOOKED: 'cyan',
    OFFLINE: 'grey'
  };

  const logColor = logColors[alert] || logColors.OFFLINE;
  const message = statusMessages[alert] || statusMessages.OFFLINE;

  console.log(colors[logColor](message));
};

/**
 * Logs batch of room statuses.
 * @param {array} rooms Room objects.
 * @returns {undefined}
 */
export const logRoomStatuses = (rooms) => {
  console.log(`\n--- Room statuses as of ${moment().format('LLLL')} ---`);

  // const spinner = ora({
  //   text: `Monitoring room statuses`,
  //   stream: process.stdout,
  //   color: 'yellow'
  // });
  //
  // setTimeout(() => {
  //   spinner.start();
  // }, SPINNER_DELAY);

  rooms.forEach((room) => {
    logRoomStatus(room);
  });
};

/**
 * Logs board warnings.
 * @params {object} data Warning object.
 * @returns {undefined}
 */
export const logBoardWarning = ({ message }) => console.log(colors.bgYellow(message));

/**
 * Logs board failures.
 * @params {object} data Failure object.
 * @returns {undefined}
 */
export const logBoardFailure = ({ message }) => console.log(colors.bgRed(message));
