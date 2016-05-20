import React, { PropTypes } from 'react';
import moment from 'moment';

import Slider from 'material-ui/Slider';

import { styles } from './styles';
import { MAX_TIME, TIME_FORMAT } from '../../constants';

const TimeSlider = ({ actions, timeSliderValue }) => {
  const max = moment(MAX_TIME, TIME_FORMAT).diff(moment(), 'minutes');
  const onTimeChange = (e, value) => {
    const time = moment().add(value, 'm').format(TIME_FORMAT);

    actions.emitTimeTravelUpdate(time);
    actions.emitTimeSliderValueUpdate(value);
  };

  return (
    <Slider
      step={1}
      min={0}
      max={max}
      onChange={onTimeChange}
      style={styles.timeSlider}
      value={timeSliderValue}/>
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
