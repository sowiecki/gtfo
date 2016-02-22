import React, { PropTypes } from 'react';
import { Style } from 'radium';
import { VelocityComponent } from 'velocity-react';

import { applyStyles } from '../../config/composition';
import { styles, rules, TEXT_DX, TEXT_DY } from './styles';
import { positionModifier, shapeModifier } from '../../utils/rooms';
import { OFFLINE,
         PINGED,
         PING_ANIMATION_LOOPS,
         PING_ANIMATION_TIMEOUT } from '../../constants/svg';

const MeetingRoom = ({ room, pinged }) => {
  const pingAnimation = {
    fill: styles[PINGED],
    opacity: pinged ? 1 : 0
  };

  const pingLoop = pinged ? PING_ANIMATION_LOOPS : 0;

  return (
    <svg {...positionModifier(room.coordinates)}>
      <Style rules={rules.roomText}/>
      <VelocityComponent
        animation={{fill: styles[room.alert || OFFLINE]}}>
        <rect
          stroke={styles.svgStroke}
          {...shapeModifier(room.coordinates)}/>
      </VelocityComponent>
      <VelocityComponent
        animation={pingAnimation}
        loop={pingLoop}
        duration={PING_ANIMATION_TIMEOUT}
        style={{stroke: styles.svgStroke}}>
          <rect {...shapeModifier(room.coordinates)}/>
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
