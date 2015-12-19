export const FETCH_ROOM_RESERVATIONS = 'FETCH_ROOM_RESERVATIONS';

export const fetchRoomStatuses = (roomStatuses) => {
  return {
    type: FETCH_ROOM_RESERVATIONS,
    roomStatuses
  };
};

const rooms = (state = [], action) => {
  switch (action.type) {
    case FETCH_ROOM_RESERVATIONS:
      return action.roomStatuses;

    default:
      return state;
  }
};

export default rooms;
