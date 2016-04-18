/* eslint no-console:0, new-cap:0 */
/* globals console */
import colors from 'colors';
import split from 'split';
import blessed from 'blessed';
import contrib from 'blessed-contrib';
import { filter, uniq } from 'lodash';

import { logOptions, tableOptions, guageOptions } from '../config';
import { getRoomStatusMessage, guageColors } from '../utils';

const screen = blessed.screen();
const grid = new contrib.grid({ rows: 10, cols: 5, screen });
const table = grid.set(0, 3, 9, 2, contrib.table, tableOptions);
const log = grid.set(0, 0, 9, 3, contrib.log, logOptions);
const guage = grid.set(8.7, 0, 1.3, 5, contrib.gauge, guageOptions);

const consoleController = {
  /**
   * Batch log of room statuses to contrib table.
   * @param {array} rooms Room objects.
   * @returns {undefined}
   */
  logRoomStatuses(rooms) {
    table.setData({
      headers: ['Room', 'Status'],
      data: rooms.map((room) => getRoomStatusMessage(room))
    });

    const alerts = uniq(rooms.map((room) => room.alert)).sort();

    const meetingRoomsUtilization = alerts.map((alert) => ({
      percent: (filter(rooms, (room) => (
        room.alert === alert
      )).length / rooms.length) * 100,
      stroke: guageColors[alert]
    }));

    guage.setStack(meetingRoomsUtilization);
  },

  /**
   * Used by Express to stream logs to contrib rolling log.
   */
  stream() {
    return split().on('data', (message) => {
      console.log(message);
    });
  },

  /**
   * Passes argument to contrib rolling log.
   * @param {string} text
   * @returns {undefined}
   */
  log(text) {
    log.log(`${text}`);
  },

  /**
   * Logs board ready state.
   * @params {object} board Board object.
   * @returns {undefined}
   */
  boardReady(board) {
    consoleController.log(`Connected to ${board.id}`);
  },

  /**
   * Logs board warnings.
   * @params {object} data Warning object.
   * @returns {undefined}
   */
  boardWarn({ message }) {
    log.log(colors.bgYellow(message));
  },

   /**
    * Logs board failures.
    * @params {object} data Failure object.
    * @returns {undefined}
    */
  boardFail({ message }) {
    log.log(colors.bgRed(message));
  }
};

export default consoleController;
