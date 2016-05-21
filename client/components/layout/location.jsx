import React, { PropTypes } from 'react';

import MeetingRoom from './meeting-room';
import Stall from './stall';
import Marker from './marker';

import { styles } from './styles';
import { filterByLocation, youAreHere } from '../../utils';

const Location = (props) => {
  const { meetingRooms,
          stalls,
          markers,
          ping,
          displayTemp,
          tempScale,
          location,
          locationKey } = props;

  const filteredMeetingRooms = filterByLocation(meetingRooms, locationKey);
  const filteredStalls = filterByLocation(stalls, locationKey);
  const filteredMarkers = filterByLocation(markers, locationKey);

  const renderMeetingRoom = (meetingRoom, index) => (
    <MeetingRoom
      key={`${meetingRoom.name}-${index}`}
      pinged={ping && ping.id === meetingRoom.id}
      displayTemp={displayTemp}
      tempScale={tempScale}
      {...meetingRoom}/>
  );

  const renderMarker = (marker, index) => (
    <Marker
      key={`${marker.name}-${index}`}
      marker={marker}
      youAreHere={youAreHere(marker, location)}/>
  );

  const renderStall = (stall, index) => (
    <Stall key={index} {...stall}/>
  );

  return (
    <div key={locationKey} className='office-layout-container'>
      <image
        className='office-background'
        style={styles.generateOfficeBackgroundStyle(locationKey)}>
          <svg className='office-layout'>
            {filteredMeetingRooms.map(renderMeetingRoom)}
            {filteredStalls.map(renderStall)}
            {filteredMarkers.map(renderMarker)}
          </svg>
      </image>
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
  tempScale: PropTypes.string.isRequired
};

export default Location;
