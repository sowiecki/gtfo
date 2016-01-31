import React, { PropTypes } from 'react';
import { pure } from 'recompose';

import styles from './styles';
import { shapeModifier } from '../../utils/room-layout';
import { OFFLINE } from '../../constants/svg';

const Room = ({ room }) => (
  <svg>
    <rect
      fill={styles[room.alert || OFFLINE]}
      stroke={styles.svgStroke}
      {...shapeModifier(room.shape)}/>
    <text
      className='svg-text'
      dy={24}
      dx={2}
      {...shapeModifier(room.shape)}>
        {room.name}
    </text>
  </svg>
);

Room.propTypes = {
  room: PropTypes.object.isRequired
};

export default pure(Room);
