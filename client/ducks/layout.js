import immutable from 'immutable';

export const FETCH_ROOM_STATUSES = 'FETCH_ROOM_STATUSES';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_FETCH_ROOM_STATUSES_ERROR = 'EMIT_FETCH_ROOM_STATUSES_ERROR';

export const fetchRoomStatuses = (rooms) => ({
  type: FETCH_ROOM_STATUSES,
  rooms
});

const initialState = immutable.fromJS({
  meetingRooms: []
});

const layoutReducer = (state = initialState, action) => {
  const { type, meetingRooms, error } = action;

  switch (type) {
    case FETCH_ROOM_STATUSES:
      state = { meetingRooms };

      break;
    case EMIT_ROOM_STATUSES_UPDATE:
      state = { meetingRooms };

      break;
    case EMIT_FETCH_ROOM_STATUSES_ERROR:
      state = { error };

      break;
  }

  return immutable.fromJS(state);
};

export default layoutReducer;
