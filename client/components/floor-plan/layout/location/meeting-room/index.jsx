import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import { VelocityComponent } from 'velocity-react';

import { parsePosition, parseShape } from 'utils';

import {
  STATUS_COLORS,
  PING_ANIMATION_LOOPS,
  PING_ANIMATION_TIMEOUT,
  ROOM_NAME_TEXT_DX,
  ROOM_NAME_TEXT_DY
} from 'client/constants';
import Temperature from './temperature';
import stylesGenerator from './styles';

const MeetingRoom = (props) => {
  const {
    computedStyles,
    name,
    coordinates,
    alert,
    thermo,
    unitOfTemp,
    displayTemp,
    pinged,
    connectionStatus
  } = props;

  const pingAnimation = {
    fill: STATUS_COLORS.PINGED,
    opacity: pinged ? 1 : 0
  };

  const pingLoop = pinged ? PING_ANIMATION_LOOPS : 0;

  const temperature = displayTemp ? (
    <Temperature thermo={thermo} unitOfTemp={unitOfTemp} coordinates={coordinates}/>
  ) : null;

  return (
    <svg {...parsePosition(coordinates)}>
      <VelocityComponent animation={{ fill: STATUS_COLORS[alert] }}>
        <rect className={computedStyles.svgRect} {...parseShape(coordinates)}/>
      </VelocityComponent>
      <VelocityComponent
        animation={pingAnimation}
        loop={pingLoop}
        duration={PING_ANIMATION_TIMEOUT}
        className={computedStyles.svgRect}>
        <rect {...parseShape(coordinates)}/>
      </VelocityComponent>
      <svg className={computedStyles.base}>
        <text
          fill={
            connectionStatus
              ? computedStyles.svgRoomTextConnected
              : computedStyles.svgRoomTextDisconnected
          }
          dx={ROOM_NAME_TEXT_DX}
          dy={ROOM_NAME_TEXT_DY}
          transform='translate(18, -6) rotate(45)' // Only applies to Microsoft Edge
          {...parseShape(coordinates)}>
          {name}
        </text>
      </svg>
      {temperature}
    </svg>
  );
};

MeetingRoom.propTypes = {
  computedStyles: PropTypes.shape({
    svgReact: PropTypes.object.isRequired,
    svgRoomTextConnected: PropTypes.object.isRequired,
    svgRoomTextDisconnected: PropTypes.object.isRequired
  }).isRequired,
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

export default withStyles(stylesGenerator)(MeetingRoom);
