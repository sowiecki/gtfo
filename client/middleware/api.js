import http from 'http';
import immutable from 'immutable';

import {
  FETCH_ROOM_STATUSES,
  EMIT_ROOM_STATUSES_UPDATE,
  EMIT_FETCH_ROOM_STATUSES_ERROR
} from '../ducks/rooms';
import * as urls from './urls';

const fetchRoomStatuses = (next) => {
  http.get(urls.ROOMS, (response) => {
    response.on('data', (data) => {
      const rooms = immutable.fromJS(JSON.parse(data));

      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        rooms
      });
    });
  }).on('error', (error) => {
    next({
      type: EMIT_FETCH_ROOM_STATUSES_ERROR,
      error
    });
  });
};

export default () => (next) => (action) => {
  switch (action.type) {
    case FETCH_ROOM_STATUSES:
      fetchRoomStatuses(next, action);
      break;

    default:
      next(action);
      break;
  }
};
