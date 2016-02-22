import React, { PropTypes } from 'react';
import { Style } from 'radium';
import { VelocityComponent } from 'velocity-react';

import { applyStyles } from '../../config/composition';
import { styles, rules, TEXT_DX, TEXT_DY } from './styles';
import { positionModifier, shapeModifier } from '../../utils/rooms';
import { OFFLINE,
         PINGED,
         RECT_ANIMATION_LOOPS,
         RECT_ANIMATION_TIMEOUT } from '../../constants/svg';

const MeetingRoom = ({ room, pinged }) => {
  const rectAnimation = {
    fill: styles[!pinged ? (room.alert || OFFLINE) : PINGED]
  };

  return (
    <svg {...positionModifier(room.coordinates)}>
      <Style rules={rules.roomText}/>
      <VelocityComponent
        animation={rectAnimation} loop={RECT_ANIMATION_LOOPS}
        duration={RECT_ANIMATION_TIMEOUT}>
          <rect
            fill={styles[room.alert || OFFLINE]}
            stroke={styles.svgStroke}
            {...shapeModifier(room.coordinates)}>
          </rect>
      </VelocityComponent>
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
