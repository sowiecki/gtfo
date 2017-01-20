import React, { PropTypes } from 'react';
import { VelocityComponent } from 'velocity-react';

import { styles } from './styles';
import { STATUS_COLORS, OFFLINE } from '../../constants';
import { parsePosition, parseShape } from '../../utils';

const Stall = ({ active, alert, coordinates }) => (
  <svg {...parsePosition(coordinates)}>
    <VelocityComponent
      animation={{ fill: active ? STATUS_COLORS[alert] : STATUS_COLORS[OFFLINE] }}>
        <rect
          style={styles.svgRect}
          {...parseShape(coordinates)}/>
    </VelocityComponent>
  </svg>
);

Stall.propTypes = {
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

export default Stall;
