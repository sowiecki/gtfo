import React, { PropTypes } from 'react';
import { VelocityComponent } from 'velocity-react';

import { styles } from './styles';
import { STATUS_COLORS } from '../../constants';
import { parsePosition, parseShape } from '../../utils';

const Stall = ({ alert, coordinates }) => (
  <svg {...parsePosition(coordinates)}>
    <VelocityComponent
      animation={{ fill: STATUS_COLORS[alert] }}>
        <rect
          style={styles.svgRect}
          {...parseShape(coordinates)}/>
    </VelocityComponent>
  </svg>
);

Stall.propTypes = {
  id: PropTypes.string.isRequired,
  alert: PropTypes.string.isRequired,
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }).isRequired
};

export default Stall;
