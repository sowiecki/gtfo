import immutable from 'immutable';

export const FETCH_ROOM_STATUSES = 'FETCH_ROOM_STATUSES';
export const EMIT_ROOM_STATUSES_UPDATE = 'EMIT_ROOM_STATUSES_UPDATE';
export const EMIT_FETCH_ROOM_STATUSES_ERROR = 'EMIT_FETCH_ROOM_STATUSES_ERROR';

export const fetchRoomStatuses = (rooms) => ({
  type: FETCH_ROOM_STATUSES,
  rooms
});

const initialState = immutable.fromJS({});

const rooms = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOM_STATUSES:
      return action.rooms;

    case EMIT_ROOM_STATUSES_UPDATE:
      return action.rooms;

    case EMIT_FETCH_ROOM_STATUSES_ERROR:
      // TODO error handling

    default:
      return state;
  }
};

export default rooms;
