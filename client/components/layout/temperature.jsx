import React from 'react';
import PropTypes from 'prop-types';

import { ROOM_TEMPERATURE_TEXT_DX, ROOM_TEMPERATURE_TEXT_DY } from './styles';
import { applyStyles } from '../../config/composition';
import { parseShape } from '../../utils';
import { FAHRENHEIT } from '../../constants';

const Temperature = (props) => {
  const { thermo,
          unitOfTemp,
          coordinates } = props;

  if (!thermo) {
    return null;
  }

  const isFarenheit = unitOfTemp === FAHRENHEIT;
  const temperature = isFarenheit ? thermo.F : thermo.C;
  const unitOfTempSuffix = isFarenheit ? '°F' : '°C';

  return (
      <text
        className='temperature-text'
        dx={ROOM_TEMPERATURE_TEXT_DX}
        dy={ROOM_TEMPERATURE_TEXT_DY}
        {...parseShape(coordinates)}>
          {Math.floor(temperature)} {unitOfTempSuffix}
      </text>
  );
};

Temperature.propTypes = {
  coordinates: PropTypes.object.isRequired,
  thermo: PropTypes.object,
  unitOfTemp: PropTypes.string.isRequired
};

export default applyStyles(Temperature);
