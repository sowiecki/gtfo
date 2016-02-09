import React, { PropTypes } from 'react';
import { Style } from 'radium';

import { applyStyles } from '../../config/composition';
import { styles, rules, TEXT_DX, TEXT_DY } from './styles';
import { shapeModifier } from '../../utils/room-layout';
import { OFFLINE } from '../../constants/svg';

const MeetingRoom = ({ room }) => {
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
        dx={TEXT_DX}
        dy={TEXT_DY}
        {...shapeModifier(room.coordinates)}>
          {room.name}
      </text>
    </svg>
  );
};

MeetingRoom.propTypes = {
  room: PropTypes.object.isRequired
};

export default applyStyles(MeetingRoom);
