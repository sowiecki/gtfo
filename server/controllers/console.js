/* eslint no-console:0, new-cap:0 */
/* globals console */

import moment from 'moment';
import marked from 'marked';
import TerminalRenderer from 'marked-terminal';

import { getRoomStatusMessage, formatDurationForDisplay } from '../utils';

marked.setOptions({
  renderer: new TerminalRenderer()
});

// TODO - see https://github.com/Nase00/gtfo/issues/164
const consoleController = {
  initialize() {
    const timeOfBoot = moment().toDate();
    setInterval(() => {
      const uptimeDiff = moment().diff(timeOfBoot);
      const uptimeDuration = moment.duration(uptimeDiff);
      this.uptime = formatDurationForDisplay(uptimeDuration);
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
      const header = '| Module | Name | Status |\n| --- | --- | --- |\n';
      const mappedRooms = rooms
        .map((room) => {
          const roomStatus = getRoomStatusMessage(room);

          return `| ${roomStatus[0]} | **${roomStatus[1]}** | ${roomStatus[2]} |`;
        })
        .join('\n');

      console.log(marked(`${header}${mappedRooms}`));
    }
  },

  log: console.log
};

export default consoleController;
