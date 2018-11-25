/* globals setInterval, clearInterval */
import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import withStyles from 'withstyles';

import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';

import { pluckLocations, hasAnchor, getLocationIndex } from 'utils';
import { FLOOR_PLAN_ROOT_ID } from 'constants';
import DisplayError from 'components/common/display-error';
import RoomModalTrigger from './room-modal/trigger';
import Location from './location';
import MapLegend from './map-legend';
import stylesGenerator from './styles';

const FloorPlanLayout = (props) => {
  const { computedStyles, meetingRooms, displayLegend, location, onChangeIndex } = props;
  const locationKeys = pluckLocations(meetingRooms);

  const renderLocation = (locationKey, index) => (
    <Location key={index} locationKey={locationKey} {...props} />
  );

  return (
    <Fragment>
      <Paper id={FLOOR_PLAN_ROOT_ID}>
        <SwipeableViews
          className={computedStyles.swipableOverride}
          index={getLocationIndex(locationKeys, location)}
          onChangeIndex={onChangeIndex}
          resistance={true}>
          {locationKeys.map(renderLocation)}
        </SwipeableViews>
        <ReactCSSTransitionGroup
          transitionName='map-legend'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {displayLegend ? <MapLegend showYouAreHere={hasAnchor(location)} {...props} /> : null}
        </ReactCSSTransitionGroup>
      </Paper>
      <Route exact path='/:location/:room' render={() => <RoomModalTrigger {...props} />} />
      <DisplayError {...props} />
    </Fragment>
  );
};

FloorPlanLayout.propTypes = {
  computedStyles: PropTypes.shape({
    swipableOverride: PropTypes.object.isRequired
  }).isRequired,
  location: PropTypes.object.isRequired,
  meetingRooms: PropTypes.array,
  displayLegend: PropTypes.bool.isRequired,
  enableMotion: PropTypes.bool.isRequired,
  enableStalls: PropTypes.bool.isRequired,
  onChangeIndex: PropTypes.func.isRequired
};

export default withStyles(stylesGenerator)(FloorPlanLayout);
