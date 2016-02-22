import React, { PropTypes } from 'react';
import { Style } from 'radium';
import { VelocityComponent } from 'velocity-react';

import { applyStyles } from '../../config/composition';
import { styles, rules, TEXT_DX, TEXT_DY } from './styles';
import { shapeModifier } from '../../utils/rooms';
import { OFFLINE, PING_TIMEOUT } from '../../constants/svg';

const MeetingRoom = ({ room, pinged }) => {
  return (
    <svg>
      <Style rules={rules.roomText}/>
      <VelocityComponent animation={{ fill: styles[!pinged ? (room.alert || OFFLINE) : 'OFFLINE']}} duration={PING_TIMEOUT / 4}>
        <rect
          stroke={styles.svgStroke}
          {...shapeModifier(room.coordinates)}>
        </rect>
      </VelocityComponent>
      <text
        className='room-text'
        dx={TEXT_DX}
        dy={TEXT_DY}
        {...shapeModifier(room.coordinates)}>
          {pinged ? 'PINGED!' : room.name}
      </text>
    </svg>
  );
};

MeetingRoom.propTypes = {
  room: PropTypes.object.isRequired
};

export default applyStyles(MeetingRoom);
