import React from 'react';
import PropTypes from 'prop-types';

import Place from 'material-ui/svg-icons/maps/place';

import { applyStyles } from 'config/composition';
import { parsePosition } from 'utils';

import { styles, ROOM_NAME_TEXT_DX, MARKER_ROOM_NAME_TEXT_DY } from './styles';

const Marker = ({ marker, youAreHere }) => {
  const isAnchor = marker.type === 'anchor';
  const locationHighlight =
    youAreHere && isAnchor ? (
      <svg className='you-are-here' {...styles.locationHighlight}>
        <Place style={styles.placeMarker}/>
      </svg>
    ) : null;

  return (
    <svg {...parsePosition(marker.coordinates)}>
      <text
        className={`marker-text ${marker.type}-marker`}
        dx={ROOM_NAME_TEXT_DX}
        dy={MARKER_ROOM_NAME_TEXT_DY}>
        {marker.name}
      </text>
      {locationHighlight}
    </svg>
  );
};

Marker.propTypes = {
  marker: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    coordinates: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  youAreHere: PropTypes.bool
};

export default applyStyles(Marker);
