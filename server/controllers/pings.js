import { find } from 'lodash';

import store from '../store';
import { EMIT_ROOM_PING_RECEIVED } from '../ducks/rooms';

import { PING_ERROR } from '../constants';
import { getHost } from '../utils';

const pingsController = {
  handlePing(req, res) {
    const { rooms } = store.getState().roomsReducer.toJS();
    const { id, anchor } = req.headers;
    const room = find(rooms, { id });

    if (room) {
      store.dispatch({
        type: EMIT_ROOM_PING_RECEIVED,
        ping: {
          origin: getHost(req),
          location: room.location,
          id,
          anchor
        }
      });

      res.json({ status: 200, message: `Pinged ${id} at ${anchor}` });
    } else {
      res.json({ status: 500, message: PING_ERROR, originalRequest: { id, anchor } });
    }
  }
};

export default pingsController;
