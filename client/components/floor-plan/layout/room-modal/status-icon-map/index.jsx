import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';

import {
  BOOKED,
  ABANDONED,
  VACANT,
  SQUATTED,
  ONE_MINUTE_WARNING,
  FIVE_MINUTE_WARNING
} from 'client/constants';

const StatusIconMap = ({ alert }) =>
  ({
    [BOOKED]: <Icon>event_busy</Icon>,
    [ABANDONED]: <Icon>event_busy</Icon>,
    [VACANT]: <Icon>event_available</Icon>,
    [SQUATTED]: <Icon>event_available</Icon>,
    [ONE_MINUTE_WARNING]: <Icon>watch_later</Icon>,
    [FIVE_MINUTE_WARNING]: <Icon>watch_later</Icon>
  }[alert]);

StatusIconMap.propTypes = {
  alert: PropTypes.string.isRequired
};

export default StatusIconMap;
