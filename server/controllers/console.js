/* eslint no-console:0, new-cap:0 */
/* globals console */
import colors from 'colors';
import split from 'split';
import blessed from 'blessed';
import contrib from 'blessed-contrib';
import { uniq } from 'lodash';

import { CONTRIB_TABLE_HEADERS } from '../constants';
import { isTest, guageOptions, logOptions, tableOptions } from '../config';
import { getRoomStatusMessage, genGuagePercentage, logBoardReady } from '../utils';

const screen = blessed.screen({ dockBorders: true });

const grid = new contrib.grid({ rows: 10, cols: 5, screen });
const table = grid.set(0, 3, 8.5, 2, contrib.table, tableOptions);
const log = grid.set(0, 0, 8.5, 3, blessed.log, logOptions);
const guage = grid.set(8.5, 0, 1.5, 5, contrib.gauge, guageOptions);

const consoleController = {
  /**
   * Batch log of room statuses to console or contrib table.
   * @param {array} rooms Room objects.
   * @returns {undefined}
   */
  logRoomStatuses(rooms) {
    if (process.env.DONT_HOOK_CONSOLE) {
      rooms.forEach((room) => {
        const roomStatus = getRoomStatusMessage(room);

        console.log(`${roomStatus[0]} - ${roomStatus[1]} - ${roomStatus[2]}`);
      });
    } else {
      table.setData({
        headers: CONTRIB_TABLE_HEADERS,
        data: rooms.map((room) => getRoomStatusMessage(room))
      });

      const alerts = uniq(rooms.map((room) => room.alert)).sort();

      const meetingRoomsUtilization = alerts.map((alert) => (
        genGuagePercentage(rooms, alert)
      ));

      guage.setStack(meetingRoomsUtilization);
    }
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
  log(text, error = '', color = 'white') {
    if (process.env.DONT_HOOK_CONSOLE) {
      console.log(colors[color](text), error);
    } else {
      log.log(colors[color](text), error);
    }
  },

  /**
   * Logs board ready state.
   * @param {object} board Board object.
   * @param {object} room Room object.
   * @returns {undefined}
   */
  logBoardReady(board, room) {
    logBoardReady(board, room);
  },

  /**
   * Logs board warnings.
   * @params {object} data Warning object.
   * @returns {undefined}
   */
  logBoardWarn({ message }) {
    log.log(colors.bgYellow(message));
  },

   /**
    * Logs board failures.
    * @params {object} data Failure object.
    * @returns {undefined}
    */
  logBoardFail({ message }) {
    log.log(colors.bgRed(message));
  }
};


if (process.env.DONT_HOOK_CONSOLE || isTest) {
  screen.destroy();
}

export default consoleController;
