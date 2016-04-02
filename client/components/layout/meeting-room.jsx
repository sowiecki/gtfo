import React, { PropTypes } from 'react';
import { VelocityComponent } from 'velocity-react';

import { applyStyles } from '../../config/composition';
import { styles } from './styles';
import { parsePosition, parseShape } from '../../utils';
import { OFFLINE,
         PINGED,
         PING_ANIMATION_LOOPS,
         PING_ANIMATION_TIMEOUT,
         TEXT_DX,
         TEXT_DY } from '../../constants';

const MeetingRoom = ({ room, pinged }) => {
  const pingAnimation = {
    fill: styles[PINGED],
    opacity: pinged ? 1 : 0
  };

  const pingLoop = pinged ? PING_ANIMATION_LOOPS : 0;
console.log(room)
  return (
    <svg {...parsePosition(room.coordinates)}>
      <VelocityComponent
        animation={{ fill: styles[room.alert || OFFLINE] }}>
        <rect
          stroke={styles.svgStroke}
          {...parseShape(room.coordinates)}/>
      </VelocityComponent>
      <VelocityComponent
        animation={pingAnimation}
        loop={pingLoop}
        duration={PING_ANIMATION_TIMEOUT}
        style={{ stroke: styles.svgStroke }}>
          <rect {...parseShape(room.coordinates)}/>
      </VelocityComponent>
      <text
        className='room-text'
        dx={TEXT_DX}
        dy={TEXT_DY}
        {...parseShape(room.coordinates)}>
          {room.name}
      </text>
    </svg>
  );
};

MeetingRoom.propTypes = {
  room: PropTypes.object.isRequired,
  pinged: PropTypes.bool
};

export default applyStyles(MeetingRoom);
