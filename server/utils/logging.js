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
         OFFLINE,
         STATUS_MESSAGES,
         LOG_COLORS,
         ONLINE,
         DISCONNECTED } from '../constants';

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
export const getRoomStatusMessage = ({ name, alert, moduleOnline }) => {
  const moduleStatus = moduleOnline ? colors.green(ONLINE) : colors.red(DISCONNECTED);

  const message = STATUS_MESSAGES[alert] || STATUS_MESSAGES.OFFLINE;
  const logColor = LOG_COLORS[alert || OFFLINE];

  return [moduleStatus, name, colors[logColor].bold(message)];
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
