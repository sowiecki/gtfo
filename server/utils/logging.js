/* eslint no-console:0 */
/* globals console */
import colors from 'colors';
import moment from 'moment';
import winston from 'winston';
import split from 'split';
import ora from 'ora';
import blessed from 'blessed';
import contrib from 'blessed-contrib';

import { isProd } from '../config';

import { SQUATTED,
         VACANT,
         ONE_MINUTE_WARNING,
         FIVE_MINUTE_WARNING,
         BOOKED,
         OFFLINE,
         SPINNER_DELAY } from '../constants';

const screen = blessed.screen();

const winstonLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      humanReadableUnhandledException: true,
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

const spinner = ora({
  text: 'Monitoring room statuses',
  color: 'yellow'
});

const log = contrib.log({ fg: 'green', selectedFg: 'green', label: 'Server Log'})
screen.append(log);

export const stream = split().on('data', (message) => {
  log.log(message)
  // winstonLogger.info(message);
});

/**
 * Logs individual room status.
 * @param {object} room Room object with name and alert.
 * @returns {string} Room status message
 */
const getRoomStatusMessage = ({ name, alert }) => {
  const statusMessages = {
    [SQUATTED]: `No current reservation but is being occupied`,
    [VACANT]: `Vacant for at least 30 minutes`,
    [ONE_MINUTE_WARNING]: `1 minute left on current reservation`,
    [FIVE_MINUTE_WARNING]: `5 minutes left on current reservation`,
    [BOOKED]: `Currently booked`,
    [OFFLINE]: `Offline`
  };

  const logColors = {
    [SQUATTED]: 'magenta',
    [VACANT]: 'green',
    [ONE_MINUTE_WARNING]: 'red',
    [FIVE_MINUTE_WARNING]: 'yellow',
    [BOOKED]: 'cyan',
    [OFFLINE]: 'grey'
  };

  const logColor = logColors[alert] || logColors.OFFLINE;
  const message = statusMessages[alert] || statusMessages.OFFLINE;

  return [name, message];
};

/**
 * Logs batch of room statuses.
 * @param {array} rooms Room objects.
 * @returns {undefined}
 */
export const logRoomStatuses = (rooms) => {
  const table = contrib.table({
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    label: `Room statuses as of ${moment().format('LLLL')}`,
    width: '100%',
    height: '100%',
    border: { type: 'line', fg: 'cyan' },
    columnSpacing: 10, //in chars
    columnWidth: [20, 40] /*in chars*/
  })

   //allow control the table with the keyboard
  table.focus()

  table.setData({
    headers: ['Room', 'Status'],
    data: rooms.map((room) => getRoomStatusMessage(room))
  });

  screen.append(table);

  screen.render()

  setTimeout(() => {
    spinner.start();
  }, SPINNER_DELAY);
};

/**
 * Logs board ready state.
 * @params {object} board Board object.
 * @returns {undefined}
 */
export const logBoardReady = (board) => console.log(colors.grey.bgBlue(`Connected to ${board.id}`));

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

/**
 * Logs room reservation fetch failures.
 * @params {object} data Failure object.
 * @returns {undefined}
 */
export const logFetchRoomReservationsError = ({ code, message }) => {
  console.error('Error fetching room reservations.', code, message);
};

/**
 * Logs stall occupancy fetch failures.
 * @params {object} data Failure object.
 * @returns {undefined}
 */
export const logFetchStallOccupanciesError = ({ code, message }) => {
  console.error('Error fetching or parsing stall occupancies.', code, message);
};
