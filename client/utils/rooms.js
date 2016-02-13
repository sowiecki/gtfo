import get from 'lodash/object/get';

import { ANCHOR_PATH_REGEX } from '../constants/urls';

export const getAnchor = (store) => {
  const { pathname } = get(store.getState(), 'routeReducer.location');

  return pathname.replace(ANCHOR_PATH_REGEX, '');
};

export const shapeModifier = ({ height, width, x, y }) => {
  // height = 18.9;
  // width = 10;
  // x = 89.5;
  // y = 40.5;
  return {
    height: `${height}%`,
    width: `${width}%`,
    x: `${x}%`,
    y: `${y}%`
  };
};

export const mapPing = (state, ping) => {
  return state.get('meetingRooms').map((meetingRoom) => {
    if (meetingRoom.id === ping.id) {
      meetingRoom.pinged = true;
    }
    return meetingRoom;
  });
};
