import React, { PropTypes } from 'react';
import { pure } from 'recompose';

import styles from './styles';
import { shapeModifier } from '../../utils/room-layout';
import { OFFLINE } from '../../constants/svg';

const Room = ({ room }) => (
  <svg key={`${room.outlookAccount}-chunk`}>
    <rect
      fill={styles[room.alert || OFFLINE]}
      {...shapeModifier(room.shape)}/>
    <text fill='#000000' fontSize='10' {...shapeModifier(room.shape)}>
      {room.name}
    </text>
  </svg>
);

Room.propTypes = {
  room: PropTypes.object.isRequired
};

export default pure(Room);
