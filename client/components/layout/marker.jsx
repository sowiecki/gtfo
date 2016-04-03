import React, { PropTypes } from 'react';

import Place from 'material-ui/lib/svg-icons/maps/place';

import { applyStyles } from '../../config/composition';
import { styles } from './styles';
import { ROOM_NAME_TEXT_DX, MARKER_ROOM_NAME_TEXT_DY } from '../../constants';
import { parsePosition } from '../../utils';

const Marker = ({ marker, youAreHere }) => {
  const locationHighlight = youAreHere ? (
    <svg {...styles.locationHighlight}>
      <Place style={styles.placeMarker}/>
    </svg>
  ) : null;

  return (
    <svg {...parsePosition(marker.coordinates)}>
      <text
        className='marker-text'
        dx={ROOM_NAME_TEXT_DX}
        dy={MARKER_ROOM_NAME_TEXT_DY}>
        {marker.name}
      </text>
      {locationHighlight}
    </svg>
  );
};

Marker.propTypes = {
  marker: PropTypes.object.isRequired,
  youAreHere: PropTypes.bool
};

export default applyStyles(Marker);
