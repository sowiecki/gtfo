import React, { PropTypes } from 'react';

import Place from 'material-ui/lib/svg-icons/maps/place';

import { applyStyles } from '../../config/composition';
import { styles, TEXT_DX, MARKER_TEXT_DY } from './styles';
import { parsePosition } from '../../utils/svg';

const Marker = ({ marker, youAreHere }) => {
  const locationHighlight = youAreHere ? (
    <svg {...styles.locationHighlight}>
      <Place style={styles.placeMarker}/>
      {/*<text
        className='marker-text'
        dx={TEXT_DX + 10}
        dy={TEXT_DY}>
        You are here!
      </text>*/}
    </svg>
  ) : null;

  return (
    <svg {...parsePosition(marker.coordinates)}>
      <text
        className='marker-text'
        dx={TEXT_DX}
        dy={MARKER_TEXT_DY}>
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
