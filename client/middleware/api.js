import http from 'http';
import immutable from 'immutable';

import { FETCH_ROOM_STATUSES,
         EMIT_ROOM_STATUSES_UPDATE,
         EMIT_FETCH_ROOM_STATUSES_ERROR,
         FETCH_MARKERS,
         EMIT_MARKERS_UPDATE,
         EMIT_FETCH_MARKERS_ERROR,
         EMIT_CLEAR_FETCH_ERRORS } from '../ducks/layout';
import * as urls from '../constants/urls';
import { failedToFetchMeetingRooms,
         failedToFetchMarkers } from '../constants/errors';

const clearFetchErrors = (next) => next({ type: EMIT_CLEAR_FETCH_ERRORS });

const fetchRoomStatuses = (next) => {
  http.get(urls.ROOMS, (response) => {
    response.on('data', (data) => {
      const meetingRooms = immutable.fromJS(JSON.parse(data));

      next({
        type: EMIT_ROOM_STATUSES_UPDATE,
        meetingRooms
      });

      clearFetchErrors(next);
    });
  }).on('error', () => {
    next({
      type: EMIT_FETCH_ROOM_STATUSES_ERROR,
      error: failedToFetchMeetingRooms
    });
  });
};

const fetchMarkers = (next) => {
  http.get(urls.MARKERS, (response) => {
    response.on('data', (data) => {
      const markers = immutable.fromJS(JSON.parse(data));

      next({
        type: EMIT_MARKERS_UPDATE,
        markers
      });
    });
  }).on('error', () => {
    next({
      type: EMIT_FETCH_MARKERS_ERROR,
      error: failedToFetchMarkers
    });
  });
};

export default () => (next) => (action) => {
  switch (action.type) {
    case FETCH_ROOM_STATUSES:
      fetchRoomStatuses(next, action);

      break;

    case FETCH_MARKERS:
      fetchMarkers(next, action);

      break;
    default:
      next(action);

      break;
  }
};
