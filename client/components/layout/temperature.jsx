import React, { PropTypes } from 'react';

import { applyStyles } from '../../config/composition';
import { parseShape, calcTemperature } from '../../utils';
import { ROOM_TEMPERATURE_TEXT_DX, ROOM_TEMPERATURE_TEXT_DY } from '../../constants';

const Temperature = ({ tmpVoltage, coordinates }) => {
  const scale = '°F';

  const temperature = calcTemperature(tmpVoltage);

  return tmpVoltage ? (
      <text
        className='temperature-text'
        dx={ROOM_TEMPERATURE_TEXT_DX}
        dy={ROOM_TEMPERATURE_TEXT_DY}
        {...parseShape(coordinates)}>
          {`${temperature} ${scale}`}
      </text>
  ) : <text/>;
};

Temperature.propTypes = {
  coordinates: PropTypes.object.isRequired,
  tmpVoltage: PropTypes.number
};

export default applyStyles(Temperature);
