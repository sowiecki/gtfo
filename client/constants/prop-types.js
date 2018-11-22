import PropTypes from 'prop-types';

import { DEFAULT, DEUTERANOPIA, PROTANOPIA, TRITANOPIA } from './values';

export const PROP_TYPES = {
  statusesTheme: PropTypes.oneOf([DEFAULT, DEUTERANOPIA, PROTANOPIA, TRITANOPIA])
};
