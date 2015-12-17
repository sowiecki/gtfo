import immutable from 'immutable';

import floorplanChunks from '../utils/floorplan-chunks.js';

export const BUILD_OFFICE_LAYOUT = 'BUILD_OFFICE_LAYOUT';

export const buildOfficeLayout = () => ({ type: BUILD_OFFICE_LAYOUT });

const officeLayout = (state = {}, action) => {
  switch (action.type) {
    case BUILD_OFFICE_LAYOUT:
      return immutable.fromJS(floorplanChunks);

    default:
      return state;
  }
};

export default officeLayout;
