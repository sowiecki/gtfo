import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { VelocityComponent } from 'velocity-react';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import TimeSlider from './time-slider';
import { styles } from './styles';
import { TIME_FORMAT } from '../../constants';

const TimeTravel = (props) => {
  const { timeTravelTime, timeTravelControlsOpen, onTimeTravelDismissClick } = props;

  return (
    <VelocityComponent>
      <Card style={{ ...styles.timeTravelControls, opacity: timeTravelControlsOpen ? '1' : '0' }}>
        <CardText style={styles.timeDisplay}>
          <IconButton
            style={styles.timeTravelDismiss}
            tooltip='Dismiss and reset to present'
            tooltipPosition='top-right'
            onClick={onTimeTravelDismissClick}>
            <FontIcon color={styles.timeTravelDismissColor} className='material-icons'>
              clear
            </FontIcon>
          </IconButton>
          Viewing at {timeTravelTime || moment().format(TIME_FORMAT)}
        </CardText>
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

export default TimeTravel;
