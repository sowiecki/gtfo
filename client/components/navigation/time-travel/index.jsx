import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import withStyles from 'withstyles';

import { TIME_FORMAT } from 'client/constants';
import NotchedDrawer from 'components/common/notched-drawer';
import TimeSlider from './time-slider';
import stylesGenerator from './styles';

const TimeTravel = (props) => {
  const {
    actions,
    computedStyles,
    timeTravelControlsOpen,
    timeTravelTime,
    onTimeTravelDismissClick,
    timezone
  } = props;

  return (
    <NotchedDrawer
      className={computedStyles.base}
      isOpen={timeTravelControlsOpen}
      onClick={actions.emitTimeTravelControlsToggle.bind(null, !timeTravelControlsOpen)}
      onClose={onTimeTravelDismissClick.bind(null, !timeTravelControlsOpen)}>
      <span className={computedStyles.timeDisplay}>
        Viewing at{' '}
        {timeTravelTime
          || moment()
            .utcOffset(timezone)
            .format(TIME_FORMAT)}
      </span>
      <TimeSlider {...props} />
    </NotchedDrawer>
  );
};

TimeTravel.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired,
    timeDisplay: PropTypes.object.isRequired,
    timeTravelDismiss: PropTypes.object.isRequired
  }).isRequired,
  onTimeTravelDismissClick: PropTypes.func.isRequired,
  timeTravelTime: PropTypes.string,
  timeTravelControlsOpen: PropTypes.bool.isRequired,
  timezone: PropTypes.number.isRequired
};

export default withStyles(stylesGenerator)(TimeTravel);
