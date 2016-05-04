/* eslint no-console:0 */
/* globals console */
import colors from 'colors/safe';
import { filter } from 'lodash';

import { isTest } from '../config';
import { SQUATTED,
         VACANT,
         ONE_MINUTE_WARNING,
         FIVE_MINUTE_WARNING,
         BOOKED,
         OFFLINE } from '../constants';

const guageColors = {
  [SQUATTED]: 'magenta',
  [VACANT]: 'green',
  [ONE_MINUTE_WARNING]: 'red',
  [FIVE_MINUTE_WARNING]: 'yellow',
  [BOOKED]: 'cyan',
  [OFFLINE]: 'black',
  [undefined]: 'black'
};

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
    [OFFLINE]: 'Offline',
    [undefined]: 'Offline'
  };

  const logColors = {
    [SQUATTED]: 'bgMagenta',
    [VACANT]: 'bgGreen',
    [ONE_MINUTE_WARNING]: 'bgRed',
    [FIVE_MINUTE_WARNING]: 'bgYellow',
    [BOOKED]: 'bgCyan',
    [OFFLINE]: 'grey',
    [undefined]: 'grey'
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
export const logBoardReady = (board, room) =>
  console.log(colors.grey.bgBlue(`Connected to ${board.id} for ${room.name}`));

/**
 * Logs room reservation fetch failures.
 * @params {object} data Failure object.
 * @returns {undefined}
 */
export const logfetchRoomReservationError = ({ code, message }) => {
  if (isTest) return;
  console.error('Error fetching room reservations.', code, message);
};

/**
 * Logs stall occupancy fetch failures.
 * @params {object} data Failure object.
 * @returns {undefined}
 */
export const logFetchStallOccupanciesError = ({ code, message }) => {
  if (isTest) return;
  console.error('Error fetching or parsing stall occupancies.', code, message);
};

/**
 * Generates percentage object for contrib guage data array.
 * @param {array} rooms Array of rooms.
 * @param {string} alert Alert to determine percentage of matching rooms.
 * @returns {object}
 */
export const genGuagePercentage = (rooms, alert) => ({
  percent: (filter(rooms, (room) => (
    room.alert === alert
  )).length / rooms.length) * 100,
  stroke: guageColors[alert]
});
