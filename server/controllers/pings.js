import { find } from 'lodash';

import store from '../store/configure-store';
import { EMIT_ROOM_PING_RECEIVED } from '../ducks/rooms';

import { getHost } from '../utils';

const rooms = store().getState().roomsReducer;


const pingsController = {
  handlePing(req, res) {
    const { id, anchor } = req.headers;
    const room = find(rooms, { id });
    // console.log(req.headers.host)
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
      res.json({ status: 404 });
    }
  }
};

export default pingsController;
