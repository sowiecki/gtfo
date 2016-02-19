/* globals setInterval, clearInterval */
import React, { Component, PropTypes } from 'react';
import { Style } from 'radium';
import ImmutablePropTypes from 'immutable-props';
import slug from 'slug';

import { Paper, Tabs, Tab } from 'material-ui/lib';
import SwipeableViews from 'react-swipeable-views';

import MeetingRoom from './meeting-room';
import Marker from './marker';

import history from '../../config/history';
import { applyStyles } from '../../config/composition';
import { styles, rules } from './styles';
import { formatForDisplay,
         getPathname,
         filterRoomsByLocation,
         pluckLocations } from '../../utils/rooms';
import { PING_TIMEOUT } from '../../constants/svg';

// TODO change from hardoded
const locationBackdrops = {
  ['two-prudential-51']: require('../../assets/prudential-51.png'),
  ['two-prudential-53']: require('../../assets/prudential-51.png')
};

// TODO change from hardcoded
const locationIndexes = {
  ['two-prudential-51']: 0,
  ['two-prudential-53']: 1
};

class LayoutController extends Component {
  constructor(props) {
    super(props);

    this.flashPing = this.flashPing.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.renderLocation = this.renderLocation.bind(this);
    this.renderMeetingRoom = this.renderMeetingRoom.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
  }

  componentDidMount() {
    if (this.props.ping) {
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

  renderMeetingRoom(meetingRoom) {
    const { ping } = this.props;

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
      <image
        key={location}
        className='office-layout'
        src={locationBackdrops[this.props.location]}>
          <svg className='office-layout'>
            {filteredMeetingRooms.map(this.renderMeetingRoom)}
            {markers.map(this.renderMarker)}
          </svg>
      </image>
    );
  }

  // TODO make generic func to share with nav action
  changeLocation(newIndex, oldIndex) {
    const { meetingRooms, params } = this.props;
    const locations = pluckLocations(meetingRooms).concat(['two-prudential-51', 'two-prudential-53']); // TODO
    console.log(locations[newIndex], oldIndex)
    const anchor = params.id ? `/anchor/${params.id}` : '';
    history.push(`/${locations[newIndex]}${anchor}`);
  }

  render() {
    // console.log(props.layout.toJS())
    const { actions, location, layout, params } = this.props;
    const { meetingRooms/*, locations TODO */ } = layout.toJS();
    const pathname = getPathname(location);
    const locations = pluckLocations(meetingRooms).concat(['two-prudential-51', 'two-prudential-53']); // TODO
    // TODO properly switch browser history when swiping
    return (
      <Paper style={styles.paperOverride} zDepth={1}>
        <Style rules={rules.officeLayout}/>
        <SwipeableViews
          style={styles.swipableOverride}
          index={locationIndexes[location]}
          onChangeIndex={this.changeLocation}>
            {locations.map(this.renderLocation)}
        </SwipeableViews>
      </Paper>
    );
  }
}

LayoutController.propTypes = {
  location: PropTypes.string.isRequired,
  layout: ImmutablePropTypes.Map.isRequired,
  ping: PropTypes.object,
  actions: PropTypes.shape({
    clearPing: PropTypes.func.isRequired
  }).isRequired,
  markers: PropTypes.array
};

export default applyStyles(LayoutController);
