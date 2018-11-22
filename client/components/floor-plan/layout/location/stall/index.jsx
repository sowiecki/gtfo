import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import { VelocityComponent } from 'velocity-react';
import { PROP_TYPES } from 'constants';
import { STATUS_COLOR_THEMES } from 'components/common/styles';

import { parsePosition, parseShape } from 'utils';
import { OFFLINE } from 'client/constants';
import stylesGenerator from './styles';

const Stall = ({ computedStyles, active, alert, coordinates, statusesTheme }) => (
  <svg {...parsePosition(coordinates)}>
    <VelocityComponent
      animation={{
        fill: active
          ? STATUS_COLOR_THEMES[statusesTheme][alert]
          : STATUS_COLOR_THEMES[statusesTheme][OFFLINE]
      }}>
      <rect className={computedStyles.base} {...parseShape(coordinates)} />
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
  }).isRequired,
  statusesTheme: PROP_TYPES.statusesTheme
};

export default withStyles(stylesGenerator)(Stall);
