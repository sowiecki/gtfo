/* eslint no-console:0 */
/* globals console */
import colors from 'colors/safe';

import { SQUATTED,
         VACANT,
         ONE_MINUTE_WARNING,
         FIVE_MINUTE_WARNING,
         BOOKED,
         OFFLINE } from '../constants';

/**
 * Logs individual room status.
 * @param {object} room Room object with name and alert.
 * @returns {string} Room status message
 */
export const getRoomStatusMessage = ({ name, alert }) => {
  const statusMessages = {
    [SQUATTED]: 'Occupied without reservation',
    [VACANT]: 'Vacant for at least 30 minutes',
    [ONE_MINUTE_WARNING]: '1 minute left on current reservation',
    [FIVE_MINUTE_WARNING]: '5 minutes left on current reservation',
    [BOOKED]: 'Currently booked',
    [OFFLINE]: 'Offline'
  };

  const logColors = {
    [SQUATTED]: 'bgMagenta',
    [VACANT]: 'bgGreen',
    [ONE_MINUTE_WARNING]: 'bgRed',
    [FIVE_MINUTE_WARNING]: 'bgYellow',
    [BOOKED]: 'bgCyan',
    [OFFLINE]: 'grey'
  };

  const message = statusMessages[alert] || statusMessages.OFFLINE;
  const logColor = logColors[alert || OFFLINE];

  return [name, colors[logColor](message)];
};

/**
 * Logs board ready state.
 * @params {object} board Board object.
 * @returns {undefined}
 */
export const logBoardReady = (board) => console.log(colors.grey.bgBlue(`Connected to ${board.id}`));

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
