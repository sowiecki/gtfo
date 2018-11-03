import React from 'react';
import PropTypes from 'prop-types';

import { filterByLocation, youAreHere, getLocationBackdrop } from 'utils';

import MeetingRoom from './meeting-room';
import Stall from './stall';
import Marker from './marker';

const Location = (props) => {
  const {
    meetingRooms,
    stalls,
    markers,
    ping,
    displayTemp,
    unitOfTemp,
    location,
    locationKey
  } = props;

  const filteredMeetingRooms = filterByLocation(meetingRooms, locationKey);
  const filteredStalls = filterByLocation(stalls, locationKey);
  const filteredMarkers = filterByLocation(markers, locationKey);

  const renderMeetingRoom = (meetingRoom, index) => (
    <MeetingRoom
      key={`${meetingRoom.name}-${index}`}
      pinged={ping && ping.id === meetingRoom.id}
      displayTemp={displayTemp}
      unitOfTemp={unitOfTemp}
      {...meetingRoom}/>
  );

  const renderMarker = (marker, index) => (
    <Marker
      key={`${marker.name}-${index}`}
      marker={marker}
      youAreHere={youAreHere(marker, location)}/>
  );

  const renderStall = (stall, index) => <Stall key={index} {...stall}/>;

  return (
    <div key={locationKey} className='office-layout-container'>
      <img
        className='office-background'
        src={getLocationBackdrop(locationKey)}
        alt={`Backdrop for ${locationKey}`}/>
      <svg className='office-layout'>
        {filteredMeetingRooms.map(renderMeetingRoom)}
        {filteredStalls.map(renderStall)}
        {filteredMarkers.map(renderMarker)}
      </svg>
    </div>
  );
};

Location.propTypes = {
  meetingRooms: PropTypes.array,
  markers: PropTypes.array,
  stalls: PropTypes.array,
  ping: PropTypes.object,
  location: PropTypes.object.isRequired,
  locationKey: PropTypes.string.isRequired,
  displayTemp: PropTypes.bool.isRequired,
  unitOfTemp: PropTypes.string.isRequired
};

export default Location;