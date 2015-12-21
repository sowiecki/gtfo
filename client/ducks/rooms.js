export const FETCH_ROOM_STATUSES = 'FETCH_ROOM_STATUSES';
export const BUILD_OFFICE_LAYOUT = 'BUILD_OFFICE_LAYOUT';

export const fetchRoomStatuses = (rooms) => ({
  type: FETCH_ROOM_STATUSES,
  rooms
});

const rooms = (state = [], action) => {
  switch (action.type) {
    case FETCH_ROOM_STATUSES:
      return action.rooms;

    case BUILD_OFFICE_LAYOUT:
      return action.rooms;

    default:
      return state;
  }
};

export default rooms;
