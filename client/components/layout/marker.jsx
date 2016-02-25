import React, { PropTypes } from 'react';

import { applyStyles } from '../../config/composition';
import { TEXT_DX, TEXT_DY } from './styles';
import { parsePosition } from '../../utils/svg';

const Marker = ({ marker }) => {
  // TODO make use of props.shouldHighlight
  return (
    <svg {...parsePosition(marker.coordinates)}>
      <text
        className='marker-text'
        dx={TEXT_DX}
        dy={TEXT_DY}>
        {marker.name}
      </text>
    </svg>
  );
};

Marker.propTypes = {
  marker: PropTypes.object.isRequired
};

export default applyStyles(Marker);
