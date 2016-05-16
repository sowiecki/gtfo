import React, { PropTypes } from 'react';

import { ROOM_TEMPERATURE_TEXT_DX, ROOM_TEMPERATURE_TEXT_DY } from './styles';
import { applyStyles } from '../../config/composition';
import { parseShape } from '../../utils';
import { FAHRENHEIT } from '../../constants';

const Temperature = (props) => {
  const { thermo,
          tempScale,
          coordinates } = props;

  if (!thermo) {
    return <text/>;
  }

  const isFarenheit = tempScale === FAHRENHEIT;
  const temperature = isFarenheit ? thermo.F : thermo.C;

  return (
      <text
        className='temperature-text'
        dx={ROOM_TEMPERATURE_TEXT_DX}
        dy={ROOM_TEMPERATURE_TEXT_DY}
        {...parseShape(coordinates)}>
      {`${Math.floor(temperature)} °${tempScale === FAHRENHEIT ? 'F' : 'C'}`}
      </text>
  );
};

Temperature.propTypes = {
  coordinates: PropTypes.object.isRequired,
  thermo: PropTypes.object,
  tempScale: PropTypes.string.isRequired
};

export default applyStyles(Temperature);
