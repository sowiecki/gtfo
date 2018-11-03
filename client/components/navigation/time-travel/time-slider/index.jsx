import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import withStyles from 'withstyles';

import Slider from '@material-ui/lab/Slider';

import { MAX_TIME, TIME_FORMAT } from 'client/constants';
import stylesGenerator from './styles';

const TimeSlider = ({ computedStyles, actions, timeSliderValue }) => {
  const max = moment(MAX_TIME, TIME_FORMAT).diff(moment(), 'minutes');
  const isDaytime = max > 0;
  const onTimeChange = (e, value) => {
    const time = moment()
      .add(value, 'm')
      .format(TIME_FORMAT);

    actions.emitTimeTravelUpdate(time);
    actions.emitTimeSliderValueUpdate(value);
  };

  return isDaytime ? (
    <Fragment>
      <Slider
        step={1}
        min={0}
        max={max}
        onChange={onTimeChange}
        className={computedStyles.base}
        value={timeSliderValue}/>
      <div className={computedStyles.timeHintText}>
        Use the slider to view availabilities between now and {MAX_TIME}
      </div>
    </Fragment>
  ) : (
    <div className={computedStyles.timeUnavailable}>
      This feature is not available after {MAX_TIME}. Please try again tomorrow.
    </div>
  );
};

TimeSlider.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired
  }).isRequired,
  timeSliderValue: PropTypes.number,
  actions: PropTypes.shape({
    emitTimeTravelUpdate: PropTypes.func.isRequired,
    emitTimeTravelControlsToggle: PropTypes.func.isRequired,
    emitTimeSliderValueUpdate: PropTypes.func.isRequired
  }).isRequired
};

export default withStyles(stylesGenerator)(TimeSlider);
