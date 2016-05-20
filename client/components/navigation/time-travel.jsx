import React, { PropTypes } from 'react';
import moment from 'moment';

import { VelocityComponent } from 'velocity-react';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import TimeSlider from './time-slider';
import { styles } from './styles';
import { MAX_TIME, TIME_FORMAT } from '../../constants';

const TimeTravel = (props) => {
  const { timeTravelTime, actions, timeTravelControlsOpen } = props;

  return (
    <VelocityComponent>
      <Card style={{ ...styles.timeTravelControls, opacity: timeTravelControlsOpen ? '1' : '0' }}>
        <CardText style={styles.timeDisplay}>
          <IconButton
            style={styles.timeTravelDismiss}
            tooltip='Dismiss and reset to present'
            tooltipPosition='top-right'
            onClick={() => {
              actions.emitTimeTravelControlsToggle(!timeTravelControlsOpen);
              actions.emitTimeTravelUpdate(null);
              actions.emitTimeSliderValueUpdate(0);
            }}>
              <FontIcon
                color={styles.timeTravelDismissColor}
                className='material-icons'>
                  clear
              </FontIcon>
          </IconButton>
          Viewing at {timeTravelTime || moment().format(TIME_FORMAT)}
          <span style={styles.timeHintText}>
            Use the slider to view availabilities between now and {MAX_TIME}
          </span>
        </CardText>
        <TimeSlider {...props}/>
      </Card>
    </VelocityComponent>
  );
};

TimeTravel.propTypes = {
  timeTravelTime: PropTypes.string,
  timeTravelControlsOpen: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    emitTimeTravelUpdate: PropTypes.func.isRequired,
    emitTimeTravelControlsToggle: PropTypes.func.isRequired,
    emitTimeSliderValueUpdate: PropTypes.func.isRequired
  }).isRequired
};

export default TimeTravel;
