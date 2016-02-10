import { readFileSync } from 'fs';

const clientMarkers = JSON.parse(readFileSync('./environment/clients.json', 'utf8'));

export const SET_MARKERS = 'SET_MARKERS';

const markersReducer = (state = clientMarkers, action) => {
  const { type, markers } = action;

  switch (type) {
    case SET_MARKERS:

      return markers;

    default:
      return state;
  }
};

export default markersReducer;
