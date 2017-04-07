import { find } from 'lodash';

import store from '../store';
import { EMIT_ROOM_PING_RECEIVED } from '../ducks/rooms';

import { PING_ERROR } from '../constants';

const pingsController = {
  /**
   * Handles pings received via HTTP POST requests.
   */
  handlePingOverHTTP(req, res) {
    const { targetId, anchor } = req.headers;
    const room = this.getRoom(targetId);

    if (this.getRoom(targetId)) {
      store.dispatch({
        type: EMIT_ROOM_PING_RECEIVED,
        ping: {
          location: room.location,
          targetId,
          anchor
        }
      });

      res.json({ status: 200, message: `Pinged ${targetId} at ${anchor}` });
    } else {
      res.json({ status: 500, message: PING_ERROR, originalRequest: { targetId, anchor } });
    }
  },

  /**
   * Handles pings received via WebSocket connection to proxy.
   */
  handlePingOverWS(payload) {
    const { targetId } = payload;
    const room = pingsController.getRoom(targetId);

    if (room) {
      store.dispatch({
        type: EMIT_ROOM_PING_RECEIVED,
        ping: {
          location: room.location,
          ...payload,
          id: targetId
        }
      });
    }
  },

  getRoom(targetId) {
    const { rooms } = store.getState().roomsReducer.toJS();
    const room = find(rooms, { id: targetId });

    return room;
  }
};

export default pingsController;
