/* globals setInterval, clearInterval */
import React, { Component, PropTypes } from 'react';
import { Style } from 'radium';
import ImmutablePropTypes from 'immutable-props';

import Paper from 'material-ui/lib/paper';
import SwipeableViews from 'react-swipeable-views';

import MeetingRoom from './meeting-room';
import Marker from './marker';

import { applyStyles } from '../../config/composition';
import { styles, rules } from './styles';
import { getLocationBackdrop,
         filterRoomsByLocation,
         pluckLocations,
         updateLocationIndex } from '../../utils/rooms';
import { PING_TIMEOUT } from '../../constants/svg';

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
    const locations = pluckLocations(meetingRooms);

    if (!params.location && locations.length) {
      updateLocationIndex(locations[0]);
    }

    if (layout.toJS().ping) {
      this.flashPing();
    }
  }

  /**
   * Automatically clears pings after defined amount of time.
   */
  flashPing() {
    const { clearPing } = this.props.actions;

    const setPingTimeout = setInterval(() => {
      clearPing();
      clearInterval(setPingTimeout);
    }, PING_TIMEOUT);
  }

  handleChangeLocation(newIndex) {
    const { layout, params } = this.props;
    const { meetingRooms } = layout.toJS();
    const locations = pluckLocations(meetingRooms);

    updateLocationIndex(locations[newIndex], params.id);
  }

  renderMeetingRoom(meetingRoom) {
    const { ping } = this.props.layout.toJS();

    return (
      <MeetingRoom
        key={`${meetingRoom.name}`}
        room={meetingRoom}
        pinged={ping && ping.id === meetingRoom.id}/>
    );
  }

  renderMarker(marker, index) {
    const { markers } = this.props;

    return (
      <Marker
        key={`${marker.name}-${index}`}
        marker={marker} {...markers}/>
    );
  }

  renderLocation(location) {
    const { meetingRooms, markers } = this.props.layout.toJS();
    const filteredMeetingRooms = filterRoomsByLocation(meetingRooms, location);

    return (
      <div
        key={location}
        className='office-layout-container'
        style={styles.officeLayoutContainer}>
          <image
            className='office-layout'
            src={getLocationBackdrop(this.props.location)}>
              <svg className='office-layout'>
                {filteredMeetingRooms.map(this.renderMeetingRoom)}
                {markers.map(this.renderMarker)}
              </svg>
          </image>
      </div>
    );
  }

  render() {
    const { location, layout } = this.props;
    const { meetingRooms } = layout.toJS();
    const locations = pluckLocations(meetingRooms);

    return (
      <Paper style={styles.paperOverride} zDepth={1}>
        <Style rules={rules.officeLayout}/>
        <SwipeableViews
          className='swipeable-viewport'
          style={styles.swipableOverride}
          index={locations.indexOf(location)}
          onChangeIndex={this.handleChangeLocation}
          resistance={true}>
            {locations.map(this.renderLocation)}
        </SwipeableViews>
      </Paper>
    );
  }
}

LayoutController.propTypes = {
  location: PropTypes.string,
  layout: ImmutablePropTypes.Map.isRequired,
  meetingRooms: ImmutablePropTypes.Map,
  params: PropTypes.object.isRequired,
  ping: PropTypes.object,
  actions: PropTypes.shape({
    clearPing: PropTypes.func.isRequired
  }).isRequired,
  markers: PropTypes.array
};

export default applyStyles(LayoutController);
