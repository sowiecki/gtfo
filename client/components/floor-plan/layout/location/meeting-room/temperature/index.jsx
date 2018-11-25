import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import withStyles from 'withstyles';

import { ROOM_TEMPERATURE_TEXT_DX, ROOM_NAME_TEXT_POSITIONS, PROP_TYPES } from 'client/constants';
import { parseShape, formatTempText } from 'utils';
import stylesGenerator from './styles';

const Temperature = ({ computedStyles, meetingRoom, widthModifier }) => {
  const { name, coordinates, thermo } = meetingRoom;

  if (isEmpty(thermo)) {
    return null;
  }

  return (
    <svg className={computedStyles.base}>
      <text
        dx={ROOM_TEMPERATURE_TEXT_DX}
        dy={ROOM_NAME_TEXT_POSITIONS[widthModifier].dy * (2 + name.split(' ').length) - 10}
        {...parseShape(coordinates)}>
        {formatTempText(meetingRoom)}
      </text>
    </svg>
  );
};

Temperature.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired
  }).isRequired,
  meetingRoom: PROP_TYPES.meetingRoom.isRequired
};

export default withStyles(stylesGenerator)(Temperature);
