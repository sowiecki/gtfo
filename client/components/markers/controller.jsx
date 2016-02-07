import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';

import { applyStyles } from '../../config/composition';
// import { styles } from './styles';

const MarkerController = ({ markers }) => {
  const { markerLocation } = markers.toJS();

  return (
    <div>
      {markerLocation}
    </div>
  );
};

MarkerController.propTypes = {
  location: PropTypes.object.isRequired,
  markers: ImmutablePropTypes.Map.isRequired
};

export default applyStyles(MarkerController);
