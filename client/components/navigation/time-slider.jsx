import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Slider from 'material-ui/Slider';

import { styles } from './styles';
import { MAX_TIME, TIME_FORMAT } from '../../constants';

const TimeSlider = ({ actions, timeSliderValue }) => {
  const max = moment(MAX_TIME, TIME_FORMAT).diff(moment(), 'minutes');
  const isDaytime = max > 0;
  const onTimeChange = (e, value) => {
    const time = moment().add(value, 'm').format(TIME_FORMAT);

    actions.emitTimeTravelUpdate(time);
    actions.emitTimeSliderValueUpdate(value);
  };

  return isDaytime ? (
    <div>
      <Slider
        step={1}
        min={0}
        max={max}
        onChange={onTimeChange}
        style={styles.timeSlider}
        value={timeSliderValue}/>
      <span style={styles.timeHintText}>
        Use the slider to view availabilities between now and {MAX_TIME}
      </span>
    </div>
  ) : (
    <div style={styles.timeUnavailable}>
      This feature is not available after {MAX_TIME}.
      <br/>
      Please try again tomorrow.
    </div>
  );
};

TimeSlider.propTypes = {
  timeSliderValue: PropTypes.number,
  actions: PropTypes.shape({
    emitTimeTravelUpdate: PropTypes.func.isRequired,
    emitTimeTravelControlsToggle: PropTypes.func.isRequired,
    emitTimeSliderValueUpdate: PropTypes.func.isRequired
  }).isRequired
};

export default TimeSlider;
