/* eslint no-console:0, new-cap:0 */
/* globals console */
import colors from 'colors';
import split from 'split';
import blessed from 'blessed';
import contrib from 'blessed-contrib';
import { uniq } from 'lodash';
import moment from 'moment';

import { CONTRIB_TABLE_HEADERS } from '../constants';
import { isTest,
         titleOptions,
         guageOptions,
         logOptions,
         tableOptions,
         markdownOptions } from '../config';
import { getRoomStatusMessage, genGuagePercentage, logBoardReady } from '../utils';

const screen = blessed.screen({ dockBorders: true });

const grid = new contrib.grid({ rows: 11, cols: 5, screen });

grid.set(8.5, 0, 1.5, 2.5, contrib.lcd, titleOptions);
const log = grid.set(0, 0, 8.5, 3.5, blessed.log, logOptions);
const uptimeCounter = grid.set(7.9, 3.5, 0.65, 1.5, blessed.log, markdownOptions);
const table = grid.set(0, 3.5, 7.9, 1.5, contrib.table, tableOptions);
const guage = grid.set(8.5, 2.5, 1.5, 2.5, contrib.gauge, guageOptions);

const consoleController = {
  initialize() {
    const timeOfBoot = moment();

    setInterval(() => {
      const now = moment();
      const uptimeDiff = moment.utc(now.diff(timeOfBoot)).format('HH:ss');
      uptimeCounter.setContent(uptimeDiff);
    }, 1000);
  },

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
