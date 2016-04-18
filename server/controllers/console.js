/* eslint no-console:0, new-cap:0 */
/* globals console */
import colors from 'colors';
import split from 'split';
import blessed from 'blessed';
import contrib from 'blessed-contrib';

import { logOptions, tableOptions } from '../config';
import { getRoomStatusMessage } from '../utils';

const screen = blessed.screen();
const grid = new contrib.grid({ rows: 1, cols: 5, screen });
const table = grid.set(0, 3, 1, 2, contrib.table, tableOptions);
const log = grid.set(0, 0, 1, 3, contrib.log, logOptions);

const consoleController = {
  /**
   * Batch log of room statuses to contrib table.
   * @param {array} rooms Room objects.
   * @returns {undefined}
   */
  logRoomStatuses(rooms) {
    consoleController.setTableData({
      headers: ['Room', 'Status'],
      data: rooms.map((room) => getRoomStatusMessage(room))
    });
  },

  /**
   * Used by Express to stream logs to contrib rolling log.
   */
  stream() {
    return split().on('data', (message) => {
      consoleController.log(message);
    });
  },

  /**
   * Passes argument to contrib rolling log.
   * @param {string} text
   * @returns {undefined}
   */
  log(text) {
    log.log(text);
  },

  /**
   * Passes argument to contrib table.
   * @param {object} data
   * @returns {undefined}
   */
  setTableData(data) {
    table.setData(data);
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
