/* globals setInterval, clearInterval */
import React, { Component, PropTypes } from 'react';
import { Style } from 'radium';
import ImmutablePropTypes from 'immutable-props';

import Paper from 'material-ui/lib/paper';
import SwipeableViews from 'react-swipeable-views';

import MeetingRoom from './meeting-room';
import Marker from './marker';
import MapLegend from './map-legend';

import { applyStyles } from '../../config/composition';
import { styles, rules } from './styles';
import { getLocationBackdrop,
         filterByLocation,
         pluckLocations,
         updateLocationIndex,
         youAreHere,
         hasAnchor } from '../../utils';
import { PING_TIMEOUT } from '../../constants';

let originalLocation;

class LayoutController extends Component {
  constructor(props) {
    super(props);

    this.flashPing = this.flashPing.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.renderLocation = this.renderLocation.bind(this);
    this.renderMeetingRoom = this.renderMeetingRoom.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
  }

  componentDidMount() {
    if (this.props.layout.toJS().ping) {
      this.flashPing();
    }
  }

  /**
   * Forces default location parameter to first location.
   */
  componentDidUpdate() {
    const { layout, params } = this.props;
    const { meetingRooms } = layout.toJS();
    const { ping } = layout.toJS();
    const locations = pluckLocations(meetingRooms);

    if (!params.location && locations.length) {
      updateLocationIndex(locations[0]);
    }

    if (ping) {
      this.flashPing();
    }
  }

  /**
   * Checks that view is on correct location for ping.
   * Automatically clears pings after defined amount of time.
   */
  flashPing() {
    const { actions, layout, params, location } = this.props;
    const { anchor } = location.query;
    const { ping } = layout.toJS();

    // Save original location.
    originalLocation = originalLocation || params.location;

    if (params.location !== ping.location) {
      updateLocationIndex(ping.location, anchor);
    }

    const setPingTimeout = setInterval(() => {
      actions.emitClearPing();

      // Revert to original location and re-save.
      updateLocationIndex(originalLocation, anchor);
      originalLocation = params.location;

      clearInterval(setPingTimeout);
    }, PING_TIMEOUT);
  }

  handleChangeLocation(newIndex) {
    const { layout, location } = this.props;
    const { anchor } = location.query;
    const { meetingRooms } = layout.toJS();
    const locations = pluckLocations(meetingRooms);

    updateLocationIndex(locations[newIndex], anchor);
  }

  renderMeetingRoom(meetingRoom) {
    const { ping, displayTemp } = this.props.layout.toJS();

    return (
      <MeetingRoom
        key={`${meetingRoom.name}`}
        pinged={ping && ping.id === meetingRoom.id}
        displayTemp={displayTemp}
        {...meetingRoom}/>
    );
  }

  renderMarker(marker, index) {
    const { location } = this.props;

    return (
      <Marker
        key={`${marker.name}-${index}`}
        marker={marker}
        youAreHere={youAreHere(marker, location)}/>
    );
  }

  renderLocation(location) {
    const { meetingRooms, markers } = this.props.layout.toJS();
    const filteredMeetingRooms = filterByLocation(meetingRooms, location);
    const filteredMarkers = filterByLocation(markers, location);

    return (
      <div
        key={location}
        className='office-layout-container'
        style={styles.officeLayoutContainer}>
          <image
            className='office-layout'
            src={getLocationBackdrop(this.props.params.location)}>
              <svg className='office-layout'>
                {filteredMeetingRooms.map(this.renderMeetingRoom)}
                {filteredMarkers.map(this.renderMarker)}
              </svg>
          </image>
      </div>
    );
  }

  render() {
    const { params, layout, location } = this.props;
    const { meetingRooms, displayLegend } = layout.toJS();
    const locations = pluckLocations(meetingRooms);

    return (
      <Paper style={styles.paperOverride} zDepth={1}>
        <Style rules={rules.officeLayout}/>
        <SwipeableViews
          className='swipeable-viewport'
          style={styles.swipableOverride}
          index={locations.indexOf(params.location)}
          onChangeIndex={this.handleChangeLocation}
          resistance={true}>
            {locations.map(this.renderLocation)}
        </SwipeableViews>
        <MapLegend
          enabled={displayLegend}
          showYouAreHere={hasAnchor(location)}/>
      </Paper>
    );
  }
}

LayoutController.propTypes = {
  location: PropTypes.object.isRequired,
  layout: ImmutablePropTypes.Map.isRequired,
  meetingRooms: ImmutablePropTypes.Map,
  params: PropTypes.shape({
    location: PropTypes.string
  }).isRequired,
  ping: PropTypes.object,
  actions: PropTypes.shape({
    emitClearPing: PropTypes.func.isRequired
  }).isRequired,
  markers: PropTypes.array
};

export default applyStyles(LayoutController);
