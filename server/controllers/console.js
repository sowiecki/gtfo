/* eslint no-console:0, new-cap:0 */
/* globals console */
import colors from 'colors';
import moment from 'moment';
import split from 'split';
import blessed from 'blessed';
import contrib from 'blessed-contrib';

import { getRoomStatusMessage } from '../utils';

const logOptions = {
  fg: 'green',
  selectedFg: 'blue',
  label: 'Server Log',
  width: '100%',
  height: '50%',
  border: { type: 'line', fg: 'red' }
};

const tableOptions = {
  fg: 'white',
  selectedFg: 'white',
  selectedBg: 'red',
  label: `Room statuses as of ${moment().format('LLLL')}`,
  width: '100%',
  height: '50%',
  border: { type: 'line', fg: 'red' },
  columnSpacing: 10,
  columnWidth: [20, 40]
};

const screen = blessed.screen();
const grid = new contrib.grid({ rows: 1, cols: 3, screen });
const table = grid.set(0, 2, 1, 1, contrib.table, tableOptions);
const log = grid.set(0, 0, 1, 2, contrib.log, logOptions);

const consoleController = {
  /**
   * Logs batch of room statuses.
   * @param {array} rooms Room objects.
   * @returns {undefined}
   */
  logRoomStatuses(rooms) {
    consoleController.setTableData({
      headers: ['Room', 'Status'],
      data: rooms.map((room) => getRoomStatusMessage(room))
    });
  },

  stream() {
    return split().on('data', (message) => {
      consoleController.log(message);
    });
  },

  log(text) {
    log.log(text);
  },

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
