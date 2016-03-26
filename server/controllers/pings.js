import { find } from 'lodash';

import store from '../store/configure-store';
import { EMIT_ROOM_PING_RECEIVED } from '../ducks/rooms';

import { PING_ERROR } from '../constants';
import { getHost } from '../utils';

const rooms = store().getState().roomsReducer;


const pingsController = {
  handlePing(req, res) {
    const { id, anchor } = req.headers;
    const room = find(rooms, { id });

    if (room) {
      store().dispatch({
        type: EMIT_ROOM_PING_RECEIVED,
        ping: {
          origin: getHost(req),
          location: room.location,
          id,
          anchor
        }
      });

      res.json({ status: 200 });
    } else {
      res.json({ status: 500, message: PING_ERROR });
    }
  }
};

export default pingsController;
