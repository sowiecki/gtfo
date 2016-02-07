import { readFileSync } from 'fs';

const baseMarkers = JSON.parse(readFileSync('./data/markers.json', 'utf8'));

export const SET_MARKERS = 'SET_MARKERS';

const markersReducer = (state = baseMarkers, action) => {
  const { type, markers } = action;

  switch (type) {
    case SET_MARKERS:

      return markers;

    default:
      return state;
  }
};

export default markersReducer;
