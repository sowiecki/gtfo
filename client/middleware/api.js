import http from 'http';
import immutable from 'immutable';

import {
  FETCH_ROOM_STATUSES,
  BUILD_OFFICE_LAYOUT
} from '../ducks/rooms';
import * as urls from './urls';

const fetchRoomStatuses = (next) => {
  http.get(urls.ROOMS, (response) => {
    response.on('data', (data) => {
      const rooms = immutable.fromJS(JSON.parse(data));

      next({
        type: BUILD_OFFICE_LAYOUT,
        rooms
      });
    });
  }).on('error', (error) => {
    console.log(error);
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
