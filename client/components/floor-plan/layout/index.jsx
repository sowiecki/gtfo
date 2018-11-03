/* globals setInterval, clearInterval */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Style } from 'radium';
import withStyles from 'withstyles';

import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';

import { pluckLocations, hasAnchor, getLocationIndex } from 'utils';

import DisplayError from 'components/common/display-error';
import RoomModalEnable from 'components/floor-plan/room-modal/enable';
import MapLegend from 'components/floor-plan/map-legend';
import Location from 'components/floor-plan/location';
import { rules } from '../styles';
import stylesGenerator from './styles';

const FloorPlanLayout = (props) => {
  const {
    computedStyles,
    meetingRooms,
    displayLegend,
    location,
    enableMotion,
    enableStalls,
    onChangeIndex
  } = props;
  const locationKeys = pluckLocations(meetingRooms);

  const renderLocation = (locationKey, index) => (
    <Location key={index} locationKey={locationKey} {...props}/>
  );

  return (
    <Fragment>
      <Style rules={rules.officeLayout}/>
      <Paper zDepth={1}>
        <SwipeableViews
          className={computedStyles.swipableOverride}
          index={getLocationIndex(locationKeys, location)}
          onChangeIndex={onChangeIndex}
          resistance={true}>
          {locationKeys.map(renderLocation)}
        </SwipeableViews>
        <MapLegend
          enabled={displayLegend}
          enableMotion={enableMotion}
          enableStalls={enableStalls}
          showYouAreHere={hasAnchor(location)}/>
      </Paper>
      <Route exact path='/:location/:room' render={() => <RoomModalEnable {...props}/>}/>
      <DisplayError {...props}/>
    </Fragment>
  );
};

FloorPlanLayout.propTypes = {
  location: PropTypes.object.isRequired,
  meetingRooms: PropTypes.array,
  displayLegend: PropTypes.bool.isRequired,
  enableMotion: PropTypes.bool.isRequired,
  enableStalls: PropTypes.bool.isRequired,
  onChangeIndex: PropTypes.func.isRequired
};

export default withStyles(stylesGenerator)(FloorPlanLayout);
