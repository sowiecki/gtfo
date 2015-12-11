export const FETCH_ROOM_STATUSES = 'FETCH_ROOM_STATUSES';

export const fetchRoomStatuses = (roomStatuses) => {
  return {
    type: FETCH_ROOM_STATUSES,
    roomStatuses
  };
};

const rooms = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ROOM_STATUSES:
      return action.roomStatuses;
    default:
      return state;
  }
};

export default rooms;
