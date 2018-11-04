import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import { VelocityComponent } from 'velocity-react';

import { parsePosition, parseShape } from 'utils';
import { STATUS_COLORS, OFFLINE } from 'client/constants';
import stylesGenerator from './styles';

const Stall = ({ computedStyles, active, alert, coordinates }) => (
  <svg {...parsePosition(coordinates)}>
    <VelocityComponent animation={{ fill: active ? STATUS_COLORS[alert] : STATUS_COLORS[OFFLINE] }}>
      <rect className={computedStyles.base} {...parseShape(coordinates)}/>
    </VelocityComponent>
  </svg>
);

Stall.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  alert: PropTypes.string.isRequired,
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }).isRequired
};

export default withStyles(stylesGenerator)(Stall);
