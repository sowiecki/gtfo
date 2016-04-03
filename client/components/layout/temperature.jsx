import React, { PropTypes } from 'react';

import { applyStyles } from '../../config/composition';
import { parseShape,
         calcFahrenheitTemp,
         calcCelciusTemp } from '../../utils';
import { FAHRENHEIT,
         ROOM_TEMPERATURE_TEXT_DX,
         ROOM_TEMPERATURE_TEXT_DY } from '../../constants';

const Temperature = (props) => {
  const { tempScale,
          fahrenheitTmpVoltage,
          celciusTmpVoltage,
          coordinates } = props;

  if (!fahrenheitTmpVoltage || !celciusTmpVoltage) {
    return <text/>;
  }

  const temperature = tempScale === FAHRENHEIT ?
    calcFahrenheitTemp(fahrenheitTmpVoltage) : calcCelciusTemp(celciusTmpVoltage);

  return (
      <text
        className='temperature-text'
        dx={ROOM_TEMPERATURE_TEXT_DX}
        dy={ROOM_TEMPERATURE_TEXT_DY}
        {...parseShape(coordinates)}>
          {`${temperature} °${tempScale === FAHRENHEIT ? 'F' : 'C'}`}
      </text>
  );
};

Temperature.propTypes = {
  coordinates: PropTypes.object.isRequired,
  fahrenheitTmpVoltage: PropTypes.number,
  celciusTmpVoltage: PropTypes.number,
  tempScale: PropTypes.string.isRequired
};

export default applyStyles(Temperature);
