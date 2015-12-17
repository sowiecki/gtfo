import http from 'http';

import { FETCH_ROOM_STATUSES } from '../ducks/rooms';

const fetchRoomStatuses = (next) => {
  // TODO use source
  http.get('source', (response) => {
    response.on('data', (data) => {
      const roomStatuses = JSON.parse(data);

      next(roomStatuses);
    });
  // }).on('error', (error) => {
    // TODO error handling
  });
};

export default () => (next) => (action) => {
  switch (action.type) {
    case FETCH_ROOM_STATUSES:
      fetchRoomStatuses(next, action);
      break;

    default:
      next({ type: action.type });
      break;
  }
};
