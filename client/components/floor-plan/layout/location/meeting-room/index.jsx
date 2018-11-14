import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';
import { compose } from 'recompose';

import { VelocityComponent } from 'velocity-react';

import RoomModal from 'components/floor-plan/layout/room-modal';
import { parsePosition, parseShape } from 'utils';
import withModal from 'components/floor-plan/layout/room-modal/with-modal';

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
    actions,
    unitOfTemp,
    displayTemp,
    connectionStatus,
    meetingRoom,
    getLocationParams,
    onLayoutReset
  } = props;
  const { id, name, coordinates, alert, thermo, pinged } = meetingRoom;
  const pingAnimation = { fill: STATUS_COLORS.PINGED, opacity: pinged ? 1 : 0 };
  const pingLoop = pinged ? PING_ANIMATION_LOOPS : 0;

  const temperature = displayTemp ? (
    <Temperature thermo={thermo} unitOfTemp={unitOfTemp} coordinates={coordinates} />
  ) : null;

  const onClick = () => {
    onLayoutReset();
    actions.emitModalContentUpdate(<RoomModal {...props} meetingRoom={meetingRoom} />);
    actions.push(`/${getLocationParams().location}/${id}`);
  };

  return (
    <svg className={computedStyles.base} {...parsePosition(coordinates)} onClick={onClick}>
      <VelocityComponent animation={{ fill: STATUS_COLORS[alert] }}>
        <rect className={computedStyles.svgRect} {...parseShape(coordinates)} />
      </VelocityComponent>
      <VelocityComponent
        animation={pingAnimation}
        loop={pingLoop}
        duration={PING_ANIMATION_TIMEOUT}
        className={computedStyles.svgRect}>
        <rect {...parseShape(coordinates)} />
      </VelocityComponent>
      <svg className={computedStyles.textContainer}>
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
  getLocationParams: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    emitModalContentUpdate: PropTypes.func.isRequired
  }).isRequired,
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired,
    textContainer: PropTypes.object.isRequired,
    svgReact: PropTypes.object.isRequired,
    svgRoomTextConnected: PropTypes.object.isRequired,
    svgRoomTextDisconnected: PropTypes.object.isRequired
  }).isRequired,
  meetingRoom: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired
    }).isRequired,
    alert: PropTypes.string,
    thermo: PropTypes.object,
    pinged: PropTypes.bool,
    connectionStatus: PropTypes.bool.isRequired
  }).isRequired,
  unitOfTemp: PropTypes.string.isRequired,
  displayTemp: PropTypes.bool,
  onLayoutReset: PropTypes.func.isRequired
};

// export default withStyles(stylesGenerator)(MeetingRoom);
export default compose(
  withModal,
  withStyles(stylesGenerator)
)(MeetingRoom);
