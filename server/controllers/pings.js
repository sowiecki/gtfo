import { find } from 'lodash';

import store from '../store';
import { EMIT_ROOM_PING_RECEIVED } from '../ducks/rooms';

import { PING_ERROR } from '../constants';

const pingsController = {
  /**
   * Handles pings received via HTTP POST requests.
   */
  handlePingOverHTTP(req, res) {
    const { id, anchor } = req.headers;
    const room = this.getRoom(id);

    if (this.getRoom(id)) {
      store.dispatch({
        type: EMIT_ROOM_PING_RECEIVED,
        ping: {
          location: room.location,
          id,
          anchor
        }
      });

      res.json({ status: 200, message: `Pinged ${id} at ${anchor}` });
    } else {
      res.json({ status: 500, message: PING_ERROR, originalRequest: { id, anchor } });
    }
  },

  /**
   * Handles pings received via WebSocket connection to Acheron.
   */
  handlePingOverWS(payload) {
    const { id } = payload;
    const room = this.getRoom(id);

    if (room) {
      store.dispatch({
        type: EMIT_ROOM_PING_RECEIVED,
        ping: {
          location: room.location,
          ...payload
        }
      });
    }
  },

  getRoom(id) {
    const { rooms } = store.getState().roomsReducer.toJS();
    const room = find(rooms, { id });

    return room;
  }
};

export default pingsController;
