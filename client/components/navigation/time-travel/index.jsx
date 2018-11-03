import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import withStyles from 'withstyles';

import { VelocityComponent } from 'velocity-react';
import Card from '@material-ui/core/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import { TIME_FORMAT } from 'client/constants';
import TimeSlider from './time-slider';
import stylesGenerator, { TIME_TRAVEL_DISMISS_COLOR } from './styles';

const TimeTravel = (props) => {
  const { computedStyles, timeTravelTime, onTimeTravelDismissClick } = props;

  return (
    <VelocityComponent>
      <Card className={computedStyles.base}>
        <span className={computedStyles.timeDisplay}>
          <IconButton
            className={computedStyles.timeTravelDismiss}
            tooltip='Dismiss and reset to present'
            tooltipPosition='top-right'
            onClick={onTimeTravelDismissClick}>
            <FontIcon color={TIME_TRAVEL_DISMISS_COLOR} className='material-icons'>
              clear
            </FontIcon>
          </IconButton>
          Viewing at {timeTravelTime || moment().format(TIME_FORMAT)}
        </span>
        <TimeSlider {...props}/>
      </Card>
    </VelocityComponent>
  );
};

TimeTravel.propTypes = {
  onTimeTravelDismissClick: PropTypes.func.isRequired,
  timeTravelTime: PropTypes.string,
  timeTravelControlsOpen: PropTypes.bool.isRequired
};

export default withStyles(stylesGenerator)(TimeTravel);
