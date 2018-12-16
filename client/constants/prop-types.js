import PropTypes from 'prop-types';

import { DEFAULT, DEUTERANOPIA, PROTANOPIA, TRITANOPIA } from './values';

export const PROP_TYPES = {
  statusesTheme: PropTypes.oneOf([DEFAULT, DEUTERANOPIA, PROTANOPIA, TRITANOPIA]),
  meetingRoom: PropTypes.shape({
    id: PropTypes.string.isRequired,
    alert: PropTypes.string.isRequired,
    coordinates: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    currenReservation: PropTypes.shape({
      email: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired
    }),
    thermo: PropTypes.shape({
      f: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      c: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  })
};
