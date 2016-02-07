import React, { PropTypes } from 'react';
// import { Style } from 'radium';

import { applyStyles } from '../../config/composition';
// import { rules } from './styles';

const Marker = ({ marker }) => {
  // console.log(marker);
  return (
    <div>
      WIP {marker.name}
    </div>
  );
};

Marker.propTypes = {
  marker: PropTypes.object.isRequired
};

export default applyStyles(Marker);
