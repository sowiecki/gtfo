/* globals setInterval, clearInterval */
import React, { Component, PropTypes } from 'react';
import { Style } from 'radium';
import ImmutablePropTypes from 'immutable-props';
import slug from 'slug';

import { Paper, Tabs, Tab } from 'material-ui/lib';
import SwipeableViews from 'react-swipeable-views';

import MeetingRoom from './meeting-room';
import Marker from './marker';

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
    this.renderMeetingRoom = this.renderMeetingRoom.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    this.renderLocationTab = this.renderLocationTab.bind(this);
    this.renderLocation = this.renderLocation.bind(this);
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

  renderLocationTab(location, index) {
    return (
      <Tab
        key={`${location}-${index}`}
        label={formatForDisplay(location)}
        value={index}/>
    );
  }

  renderLocation(location) {
    const { meetingRooms, markers } = this.props.layout.toJS();
    const locationSlug = slug('Two Prudential 51', { lower: true}); // TODO
    const filteredMeetingRooms = filterRoomsByLocation(meetingRooms, location);

    return (
      <image
        key={location}
        className='office-layout'
        src={locationBackdrops[locationSlug]}>
          <svg className='office-layout'>
            {filteredMeetingRooms.map(this.renderMeetingRoom)}
            {markers.map(this.renderMarker)}
          </svg>
      </image>
    );
  }

  render() {
    // console.log(props.layout.toJS())
    const { actions, location, layout } = this.props;
    const { meetingRooms } = layout.toJS();
    const changeLocationIndex = actions.emitLocationIndexUpdate;
    const pathname = getPathname(location);
    const locations = pluckLocations(meetingRooms).concat(['two-prudential-51', 'two-prudential-53']); // TODO

    return (
      <Paper style={styles.paperOverride} zDepth={1}>
        <Style rules={rules.officeLayout}/>
        <Tabs
          onChange={changeLocationIndex}
          value={locationIndexes[location]}>
            {locations.map(this.renderLocationTab)}
        </Tabs>
        <SwipeableViews
          style={styles.swipableOverride}
          index={locationIndexes[location]}
          onChangeIndex={changeLocationIndex}>
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
