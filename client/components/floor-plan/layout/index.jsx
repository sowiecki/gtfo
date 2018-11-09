/* globals setInterval, clearInterval */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import withStyles from 'withstyles';

import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';

import { pluckLocations, hasAnchor, getLocationIndex } from 'utils';

import DisplayError from 'components/common/display-error';
import RoomModalEnable from './room-modal/enable';
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
      <Paper id='floor-plan-root'>
        <SwipeableViews
          className={computedStyles.swipableOverride}
          index={getLocationIndex(locationKeys, location)}
          onChangeIndex={onChangeIndex}
          resistance={true}>
          {locationKeys.map(renderLocation)}
        </SwipeableViews>
        <MapLegend enabled={displayLegend} showYouAreHere={hasAnchor(location)} {...props} />
      </Paper>
      <Route exact path='/:location/:room' render={() => <RoomModalEnable {...props} />} />
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
