import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { applyStyles } from 'config/composition';
import { parseShape } from 'utils';

import { FAHRENHEIT } from '../../constants';
import { ROOM_TEMPERATURE_TEXT_DX, ROOM_TEMPERATURE_TEXT_DY } from './styles';

const Temperature = (props) => {
  const { thermo, unitOfTemp, coordinates } = props;

  if (isEmpty(thermo)) {
    return null;
  }

  const isFarenheit = unitOfTemp === FAHRENHEIT;
  const temperature = isFarenheit ? thermo.f : thermo.c;
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
  thermo: PropTypes.shape({
    f: PropTypes.string,
    c: PropTypes.string
  }),
  unitOfTemp: PropTypes.string.isRequired
};

export default applyStyles(Temperature);
