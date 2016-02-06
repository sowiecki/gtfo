import React from 'react';
import { Style } from 'radium';
import { List } from 'immutable-props';

import Paper from 'material-ui/lib/paper';

import Room from './room';

import { applyStyles } from '../../config/composition';
import { rules } from './styles';

const RoomsController = ({ rooms }) => (
  <Paper zDepth={1}>
    <Style rules={rules.officeLayout}/>
    <image className='office-layout' src={require('../../assets/layout.svg')}>
      <svg className='office-layout'>
        {rooms.toJS().map((room) => <Room key={`${room.name}`} room={room}/>)}
      </svg>
    </image>
  </Paper>
);

RoomsController.propTypes = {
  rooms: List
};

export default applyStyles(RoomsController);
