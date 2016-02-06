import React, { PropTypes } from 'react';
import { Style } from 'radium';

import { applyStyles } from '../../config/composition';
import { styles, rules } from './styles';
import { shapeModifier } from '../../utils/room-layout';
import { OFFLINE } from '../../constants/svg';

const Room = ({ room }) => {
  // console.log(room);
  return (
    <svg>
      <Style rules={rules.roomText}/>
      <rect
        fill={styles[room.alert || OFFLINE]}
        stroke={styles.svgStroke}
        {...shapeModifier(room.coordinates)}/>
      <text
        className='room-text'
        style={styles.svgText}
        dy={24}
        dx={2}
        {...shapeModifier(room.coordinates)}>
          {room.name}
      </text>
    </svg>
  );
};

Room.propTypes = {
  room: PropTypes.object.isRequired
};

export default applyStyles(Room);
