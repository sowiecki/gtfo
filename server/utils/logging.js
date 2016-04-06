/* eslint no-console:0 */
/* globals console */
import colors from 'colors';
import moment from 'moment';
import winston from 'winston';
import split from 'split';
import ora from 'ora';

import { isProd } from '../config';

import { SQUATTED,
         VACANT,
         ONE_MINUTE_WARNING,
         FIVE_MINUTE_WARNING,
         BOOKED,
         OFFLINE,
         SPINNER_DELAY } from '../constants';

const winstonLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
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

export const stream = split().on('data', (message) => {
  if (isProd) {
    spinner.stop();
  }

  winstonLogger.info(message);

  if (isProd) {
    spinner.start();
  }
});

/**
 * Logs individual room status.
 * @param {object} room Room object with name and alert.
 * @returns {undefined}
 */
const logRoomStatus = ({ name, alert }) => {
  const statusMessages = {
    [SQUATTED]: `${name} has no current reservation but is being occupied`,
    [VACANT]: `${name} is vacant for at least 30 minutes`,
    [ONE_MINUTE_WARNING]: `${name} has 1 minute left on current reservation`,
    [FIVE_MINUTE_WARNING]: `${name} has 5 minutes left on current reservation`,
    [BOOKED]: `${name} is currently booked`,
    [OFFLINE]: `${name} is offline`
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

  console.log(colors[logColor](message));
};

/**
 * Logs batch of room statuses.
 * @param {array} rooms Room objects.
 * @returns {undefined}
 */
export const logRoomStatuses = (rooms) => {
  console.log(`\n--- Room statuses as of ${moment().format('LLLL')} ---`);

  rooms.forEach((room) => {
    logRoomStatus(room);
  });

  if (isProd) {
    setTimeout(() => {
      spinner.start();
    }, SPINNER_DELAY);
  }
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
