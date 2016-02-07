import React from 'react';
import { Style } from 'radium';
import ImmutablePropTypes from 'immutable-props';

import Paper from 'material-ui/lib/paper';

import MeetingRoom from './meeting-room';
import Marker from './marker';

import { applyStyles } from '../../config/composition';
import { rules } from './styles';

const LayoutController = ({ layout }) => {
  const { meetingRooms, markers } = layout.toJS();

  const renderMeetingRooms = meetingRooms.map((room) => (
    <MeetingRoom key={`${room.name}`} room={room}/>
  ));

  const renderMarkers = markers.map((marker) => (
    <Marker key={`${marker.name}`} marker={marker} {...markers}/>
  ));

  return (
    <Paper zDepth={1}>
      <Style rules={rules.officeLayout}/>
      <image className='office-layout' src={require('../../assets/prudential-51.svg')}>
        <svg className='office-layout'>
        {renderMeetingRooms}
        {renderMarkers}
        </svg>
      </image>
    </Paper>
  );
};

LayoutController.propTypes = {
  layout: ImmutablePropTypes.Map.isRequired
};

export default applyStyles(LayoutController);
