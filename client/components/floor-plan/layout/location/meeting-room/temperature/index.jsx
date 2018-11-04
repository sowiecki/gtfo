import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import withStyles from 'withstyles';

import { parseShape } from 'utils';

import { FAHRENHEIT, ROOM_TEMPERATURE_TEXT_DX, ROOM_TEMPERATURE_TEXT_DY } from 'client/constants';
import stylesGenerator from './styles';

const Temperature = (props) => {
  const { computedStyles, thermo, unitOfTemp, coordinates } = props;

  if (isEmpty(thermo)) {
    return null;
  }

  const isFarenheit = unitOfTemp === FAHRENHEIT;
  const temperature = isFarenheit ? thermo.f : thermo.c;
  const unitOfTempSuffix = isFarenheit ? '°F' : '°C';

  return (
    <svg className={computedStyles.base}>
      <text
        dx={ROOM_TEMPERATURE_TEXT_DX}
        dy={ROOM_TEMPERATURE_TEXT_DY}
        {...parseShape(coordinates)}>
        {Math.floor(temperature)} {unitOfTempSuffix}
      </text>
    </svg>
  );
};

Temperature.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired
  }).isRequired,
  coordinates: PropTypes.object.isRequired,
  thermo: PropTypes.shape({
    f: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    c: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  unitOfTemp: PropTypes.string.isRequired
};

export default withStyles(stylesGenerator)(Temperature);
