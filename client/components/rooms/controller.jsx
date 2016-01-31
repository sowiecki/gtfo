import React from 'react';
import radium from 'radium';
import { pure } from 'recompose';
import { List } from 'immutable-props';

import Paper from 'material-ui/lib/paper';

import Room from './room';

import styles from './styles';

const RoomsController = ({ rooms }) => (
  <Paper style={styles.officeLayoutContainer} zDepth={1}>
    <svg className='office-layout'>
      {rooms.toJS().map((room) => <Room key={`${room.name}`} room={room}/>)}
    </svg>
  </Paper>
);

RoomsController.propTypes = {
  rooms: List
};

export default pure(radium(RoomsController));
