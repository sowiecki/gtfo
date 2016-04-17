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
  const { name,
          coordinates,
          alert,
          fahrenheitTmpVoltage,
          celciusTmpVoltage,
          tempScale,
          displayTemp,
          pinged } = props;

  const pingAnimation = {
    fill: styles[PINGED],
    opacity: pinged ? 1 : 0
  };

  const pingLoop = pinged ? PING_ANIMATION_LOOPS : 0;

  const temperature = displayTemp ? (
    <Temperature
      fahrenheitTmpVoltage={fahrenheitTmpVoltage}
      celciusTmpVoltage={celciusTmpVoltage}
      tempScale={tempScale}
      coordinates={coordinates}/>
  ) : null;

  return (
    <svg {...parsePosition(coordinates)}>
      <VelocityComponent
        animation={{ fill: styles[alert || OFFLINE] }}>
        <rect
          style={styles.svgRect}
          {...parseShape(coordinates)}/>
      </VelocityComponent>
      <VelocityComponent
        animation={pingAnimation}
        loop={pingLoop}
        duration={PING_ANIMATION_TIMEOUT}
        style={styles.svgRect}>
          <rect {...parseShape(coordinates)}/>
      </VelocityComponent>
      <text
        className='room-text'
        dx={ROOM_NAME_TEXT_DX}
        dy={ROOM_NAME_TEXT_DY}
        {...parseShape(coordinates)}>
          {name}
      </text>
      {temperature}
    </svg>
  );
};

MeetingRoom.propTypes = {
  name: PropTypes.string.isRequired,
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }).isRequired,
  alert: PropTypes.string,
  fahrenheitTmpVoltage: PropTypes.number,
  celciusTmpVoltage: PropTypes.number,
  tempScale: PropTypes.string.isRequired,
  displayTemp: PropTypes.bool,
  pinged: PropTypes.bool
};

export default applyStyles(MeetingRoom);
