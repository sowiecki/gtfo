import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import withStyles from 'withstyles';

import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { TIME_FORMAT } from 'client/constants';
import TimeSlider from './time-slider';
import stylesGenerator from './styles';

const TimeTravel = (props) => {
  const {
    computedStyles,
    timeTravelControlsOpen,
    timeTravelTime,
    onTimeTravelDismissClick,
    timezone
  } = props;

  return (
    <Drawer
      className={computedStyles.drawer}
      open={timeTravelControlsOpen}
      anchor='bottom'
      transitionDuration={300}
      onClose={onTimeTravelDismissClick.bind(null, !timeTravelControlsOpen)}>
      <Card className={computedStyles.base}>
        <span className={computedStyles.timeDisplay}>
          <IconButton
            className={computedStyles.timeTravelDismiss}
            onClick={onTimeTravelDismissClick}>
            <Icon>clear</Icon>
          </IconButton>
          Viewing at{' '}
          {timeTravelTime
            || moment()
              .utcOffset(timezone)
              .format(TIME_FORMAT)}
        </span>
        <TimeSlider {...props} />
      </Card>
    </Drawer>
  );
};

TimeTravel.propTypes = {
  onTimeTravelDismissClick: PropTypes.func.isRequired,
  timeTravelTime: PropTypes.string,
  timeTravelControlsOpen: PropTypes.bool.isRequired,
  timezone: PropTypes.number.isRequired
};

export default withStyles(stylesGenerator)(TimeTravel);
