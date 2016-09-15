import React, { PropTypes } from 'react';

import { VelocityComponent } from 'velocity-react';

import Temperature from './temperature';

import { styles,
         ROOM_NAME_TEXT_DX,
         ROOM_NAME_TEXT_DY } from './styles';
import { applyStyles } from '../../config/composition';
import { parsePosition, parseShape } from '../../utils';
import { STATUS_COLORS,
         PING_ANIMATION_LOOPS,
         PING_ANIMATION_TIMEOUT } from '../../constants';

const MeetingRoom = (props) => {
  const { name,
          coordinates,
          alert,
          thermo,
          unitOfTemp,
          displayTemp,
          pinged,
          connectionStatus } = props;

  const pingAnimation = {
    fill: STATUS_COLORS.PINGED,
    opacity: pinged ? 1 : 0
  };

  const pingLoop = pinged ? PING_ANIMATION_LOOPS : 0;

  const temperature = displayTemp ? (
    <Temperature
      thermo={thermo}
      unitOfTemp={unitOfTemp}
      coordinates={coordinates}/>
  ) : null;

  return (
    <svg {...parsePosition(coordinates)}>
      <VelocityComponent
        animation={{ fill: STATUS_COLORS[alert] }}>
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
        fill={connectionStatus ? styles.svgRoomTextConnected : styles.svgRoomTextDisconnected}
        dx={ROOM_NAME_TEXT_DX}
        dy={ROOM_NAME_TEXT_DY}
        transform='translate(18, -6) rotate(45)' // Only applies to Microsoft Edge
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
  thermo: PropTypes.object,
  unitOfTemp: PropTypes.string.isRequired,
  displayTemp: PropTypes.bool,
  pinged: PropTypes.bool,
  connectionStatus: PropTypes.bool.isRequired
};

export default applyStyles(MeetingRoom);
