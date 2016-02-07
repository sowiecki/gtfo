import React from 'react';
import { Style } from 'radium';
import ImmutablePropTypes from 'immutable-props';

import Paper from 'material-ui/lib/paper';

import MeetingRoom from './meeting-room';

import { applyStyles } from '../../config/composition';
import { rules } from './styles';

const LayoutController = ({ layout }) => (
  <Paper zDepth={1}>
    <Style rules={rules.officeLayout}/>
    <image className='office-layout' src={require('../../assets/layout.svg')}>
      <svg className='office-layout'>
        {layout.toJS().meetingRooms.map((room) => <MeetingRoom key={`${room.name}`} room={room}/>)}
      </svg>
    </image>
  </Paper>
);

LayoutController.propTypes = {
  layout: ImmutablePropTypes.Map.isRequired
};

export default applyStyles(LayoutController);
