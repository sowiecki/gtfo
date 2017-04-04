/* eslint no-console:0 */
/* globals console */
import colors from 'colors/safe';
import { filter } from 'lodash';

import { IS_TEST_ENV } from '../config';
import { OFFLINE,
         STATUS_MESSAGES,
         GUAGE_COLORS,
         LOG_COLORS,
         ONLINE,
         DISCONNECTED } from '../constants';

/**
 * Logs individual room status.
 * @param {object} room Room object with name and alert.
 * @returns {string} Room status message
 */
export const getRoomStatusMessage = ({ name, alert, connectionStatus }) => {
  const moduleStatus = connectionStatus ? colors.green(ONLINE) : colors.red(DISCONNECTED);

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
  if (IS_TEST_ENV) return;
  console.error('Error fetching room reservations.', code, message);
};

/**
 * Logs stall occupancy fetch failures.
 * @params {object} data Failure object.
 * @returns {undefined}
 */
export const logFetchStallOccupanciesError = ({ code, message }) => {
  if (IS_TEST_ENV) return;
  console.error('Error fetching or parsing stall occupancies.', code, message);
};

/**
 * Generates percentage object for contrib guage data array.
 * @param {array} rooms Array of rooms.
 * @param {string} alert Alert to determine percentage of matching rooms.
 * @returns {object}
 */
export const genGuagePercentage = (rooms, alert) => {
  const rawPercentage = filter(rooms, (room) => (
    room.alert === alert
  )).length / rooms.length;

  return {
    percent: Math.floor(rawPercentage * 100),
    stroke: GUAGE_COLORS[alert]
  };
};

export const formatDurationForDisplay = (duration) => [
  `${duration.years()} years`,
  `${duration.months()} months`,
  `${duration.days()} days`,
  `${duration.hours()} hours`,
  `${duration.minutes()} minutes`,
  `${duration.seconds()} seconds`
].join(' ');
