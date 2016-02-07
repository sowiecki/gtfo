import http from 'http';
import immutable from 'immutable';

import {
  FETCH_ROOM_STATUSES,
  EMIT_ROOM_STATUSES_UPDATE,
  EMIT_FETCH_ROOM_STATUSES_ERROR
} from '../ducks/layout';
import * as urls from '../constants/urls';
import { failedToFetchRooms } from '../constants/errors';

const fetchRoomStatuses = (next) => {
  http.get(urls.ROOMS, (response) => {
    response.on('data', (data) => {
      const meetingRooms = immutable.fromJS(JSON.parse(data));

      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        meetingRooms
      });
    });
  }).on('error', () => {
    next({
      type: EMIT_FETCH_ROOM_STATUSES_ERROR,
      error: failedToFetchRooms
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
