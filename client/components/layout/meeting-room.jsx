import React, { PropTypes } from 'react';
import { VelocityComponent } from 'velocity-react';

import Temperature from './temperature';

import { applyStyles } from '../../config/composition';
import { styles } from './styles';
import { parsePosition, parseShape } from '../../utils';
import { OFFLINE,
         PINGED,
         PING_ANIMATION_LOOPS,
         PING_ANIMATION_TIMEOUT,
         ROOM_NAME_TEXT_DX,
         ROOM_NAME_TEXT_DY } from '../../constants';

const MeetingRoom = (props) => {
  const { name, coordinates, alert, tmpVoltage, pinged } = props;

  const pingAnimation = {
    fill: styles[PINGED],
    opacity: pinged ? 1 : 0
  };

  const pingLoop = pinged ? PING_ANIMATION_LOOPS : 0;

  return (
    <svg {...parsePosition(coordinates)}>
      <VelocityComponent
        animation={{ fill: styles[alert || OFFLINE] }}>
        <rect
          stroke={styles.svgStroke}
          {...parseShape(coordinates)}/>
      </VelocityComponent>
      <VelocityComponent
        animation={pingAnimation}
        loop={pingLoop}
        duration={PING_ANIMATION_TIMEOUT}
        style={{ stroke: styles.svgStroke }}>
          <rect {...parseShape(coordinates)}/>
      </VelocityComponent>
      <text
        className='room-text'
        dx={ROOM_NAME_TEXT_DX}
        dy={ROOM_NAME_TEXT_DY}
        {...parseShape(coordinates)}>
          {name}
      </text>
      <Temperature
        tmpVoltage={tmpVoltage}
        coordinates={coordinates}/>
    </svg>
  );
};

MeetingRoom.propTypes = {
  name: PropTypes.string,
  coordinates: PropTypes.object.isRequired,
  alert: PropTypes.string,
  tmpVoltage: PropTypes.number,
  pinged: PropTypes.bool
};

export default applyStyles(MeetingRoom);
