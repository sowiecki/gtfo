/* globals setInterval, clearInterval */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Style } from 'radium';
import queryString from 'query-string';

import Paper from 'material-ui/Paper';
import SwipeableViews from 'react-swipeable-views';

import { applyStyles } from 'config/composition';
import { pluckLocations, hasAnchor, getLocationIndex } from 'utils';

import { PING_TIMEOUT } from '../../constants';
import DisplayError from '../common/display-error';
import RoomModalEnable from './room-modal/enable';
import MapLegend from './map-legend';
import Location from './location';
import { styles, rules } from './styles';

/*
 * References and checks used to maintain the default location.
 * The default location should always be the last location manually navigated to by a user.
 * Pings should NOT change the default location.
 */
let originalLocation;
let noPingInProgress = true;

class LocationLayoutController extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    meetingRooms: PropTypes.array,
    stalls: PropTypes.array,
    markers: PropTypes.array,
    displayLegend: PropTypes.bool.isRequired,
    displayTemp: PropTypes.bool.isRequired,
    enableMotion: PropTypes.bool.isRequired,
    enableStalls: PropTypes.bool.isRequired,
    unitOfTemp: PropTypes.string.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        location: PropTypes.string
      }).isRequired
    }),
    ping: PropTypes.object,
    actions: PropTypes.shape({
      emitClearPing: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired
    }).isRequired
  };

  componentWillMount() {
    const { actions, location } = this.props;
    const { anchor } = queryString.parse(location.search);

    actions.connectSocket({ anchor });
  }

  componentDidMount() {
    if (this.props.ping) {
      this.flashPing();
    }
  }

  /**
   * Forces default location parameter to first location.
   */
  componentDidUpdate() {
    const { location, meetingRooms, ping, actions } = this.props;
    const locations = pluckLocations(meetingRooms);

    if (!location.pathname && locations.length) {
      actions.push({ ...location, pathname: locations[0] });
    }

    if (ping && noPingInProgress) {
      this.flashPing();
      noPingInProgress = false;
    }
  }

  /**
   * Checks that view is on correct location for ping.
   * Automatically clears pings after defined amount of time.
   */
  flashPing() {
    const { actions, location, ping } = this.props;

    // Save original location.
    originalLocation = originalLocation || location.pathname;

    if (location.pathname !== ping.location) {
      actions.push({ ...location, pathname: ping.location });
    }

    const setPingTimeout = setInterval(() => {
      actions.emitClearPing();

      // Revert to original location and re-save.
      actions.push({ ...location, pathname: originalLocation });

      originalLocation = location.pathname;
      noPingInProgress = true;

      clearInterval(setPingTimeout);
    }, PING_TIMEOUT);
  }

  handleChangeLocation(newIndex) {
    const { actions, meetingRooms, location } = this.props;
    const locations = pluckLocations(meetingRooms);

    actions.push({ ...location, pathname: locations[newIndex] });
  }

  render() {
    const { meetingRooms, displayLegend, location, enableMotion, enableStalls } = this.props;
    const locationKeys = pluckLocations(meetingRooms);

    const renderLocation = (locationKey, index) => (
      <Location key={index} locationKey={locationKey} {...this.props}/>
    );

    return (
      <Fragment>
        <Style rules={rules.officeLayout}/>
        <Paper style={styles.paperOverride} zDepth={1}>
          <SwipeableViews
            className='swipeable-viewport'
            style={styles.swipableOverride}
            index={getLocationIndex(locationKeys, location)}
            onChangeIndex={this.handleChangeLocation.bind(this)}
            resistance={true}>
            {locationKeys.map(renderLocation)}
          </SwipeableViews>
          <MapLegend
            enabled={displayLegend}
            enableMotion={enableMotion}
            enableStalls={enableStalls}
            showYouAreHere={hasAnchor(location)}/>
        </Paper>
        <Route exact path='/:location/:room' render={() => <RoomModalEnable {...this.props}/>}/>
        <DisplayError {...this.props}/>
      </Fragment>
    );
  }
}

export default applyStyles(LocationLayoutController);
