/* eslint no-console:0 */
/* globals console */
import colors from 'colors';
import moment from 'moment';

import { isProd } from '../config';

import { SQUATTED,
         VACANT,
         ONE_MINUTE_WARNING,
         FIVE_MINUTE_WARNING,
         BOOKED,
         OFFLINE,
         SPINNER_DELAY } from '../constants';

/**
 * Logs individual room status.
 * @param {object} room Room object with name and alert.
 * @returns {string} Room status message
 */
export const getRoomStatusMessage = ({ name, alert }) => {
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
