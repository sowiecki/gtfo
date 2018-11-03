import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import Place from 'material-ui/svg-icons/maps/place';

import { parsePosition } from 'utils';
import { ROOM_NAME_TEXT_DX, MARKER_ROOM_NAME_TEXT_DY } from '../styles';
import stylesGenerator from './styles';

const Marker = ({ computedStyles, marker, youAreHere }) => {
  const isAnchor = marker.type === 'anchor';
  const locationHighlight = youAreHere && isAnchor ? (
    <svg className={computedStyles.locationHighlight}>
      <Place className={computedStyles.placeMarker}/>
    </svg>
  ) : null;

  return (
    <svg {...parsePosition(marker.coordinates)}>
      <text
        className={`${computedStyles.text} ${marker.type}-marker`}
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

export default withStyles(stylesGenerator)(Marker);
