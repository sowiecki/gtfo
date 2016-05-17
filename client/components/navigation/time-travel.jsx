import React, { PropTypes } from 'react';
import moment from 'moment';

import { VelocityComponent } from 'velocity-react';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TimePicker from 'material-ui/TimePicker';

import DisplayError from '../common/display-error';
import { styles } from './styles';
import { timeTravelPastDate } from '../../constants';

const TimeTravel = ({ actions, timeTravelledTo, timeTravelControlsOpen, timeTravelError }) => (
  <div>
    <DisplayError
      error={timeTravelError}
      onRequestClose={actions.clearTimeTravelError}/>
    <VelocityComponent>
      <Card style={{ ...styles.timeTravelControls, opacity: timeTravelControlsOpen ? '1' : '0' }}>
        <IconButton
          style={styles.timeTravelDismiss}
          tooltip='Dismiss and reset to present'
          tooltipPosition='top-right'
          onClick={() => {
            actions.emitTimeTravelControlsToggle(!timeTravelControlsOpen);
            actions.emitTimeTravelUpdate(null);
          }}>
            <FontIcon className='material-icons'>clear</FontIcon>
        </IconButton>
        <CardText style={styles.timeTravelText}>
          Check future room availabilities by setting the time to later in the day.
        </CardText>

        <TimePicker
          style={styles.timePicker}
          textFieldStyle={styles.timePickerTextField}
          onChange={(n, time) => {
            const isFutureTime = moment(time).isAfter(moment().subtract(1, 's'));

            if (isFutureTime) {
              actions.emitTimeTravelUpdate(time);
            } else {
              actions.emitTimeTravelError(timeTravelPastDate);
            }
          }}
          onDismiss={actions.emitTimeTravelUpdate.bind(null)}
          hintText='Set time'
          okLabel='Time travel'
          cancelLabel='Reset to present'
          value={timeTravelledTo || moment()}/>
      </Card>
    </VelocityComponent>
  </div>
);

TimeTravel.propTypes = {
  timeTravelledTo: PropTypes.object,
  timeTravelControlsOpen: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    emitTimeTravelUpdate: PropTypes.func.isRequired,
    emitTimeTravelControlsToggle: PropTypes.func.isRequired,
    clearTimeTravelError: PropTypes.func.isRequired
  }).isRequired,
  timeTravelError: PropTypes.object
};

export default TimeTravel;
