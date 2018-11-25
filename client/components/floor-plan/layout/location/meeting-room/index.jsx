import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import OfflineBolt from '@material-ui/icons/OfflineBolt';

import RoomModal from 'components/floor-plan/layout/room-modal';
import renderWithCSSTransitionGroup from 'components/common/with-css-transition-group';
import { ROOM_NAME_TEXT_DX, ROOM_NAME_TEXT_DY } from 'client/constants';
import { parsePosition, parseShape } from 'utils';
import Temperature from './temperature';
import stylesGenerator from './styles';

const MeetingRoom = (props) => {
  const {
    computedStyles,
    actions,
    location,
    unitOfTemp,
    displayTemp,
    meetingRoom,
    onLayoutReset,
    displayAdditionalInfo
  } = props;
  const { id, name, coordinates, thermo } = meetingRoom;

  const temperature = displayTemp ? (
    <Temperature thermo={thermo} unitOfTemp={unitOfTemp} coordinates={coordinates} />
  ) : null;

  const onClick = () => {
    onLayoutReset();
    actions.emitModalContentUpdate(<RoomModal {...props} meetingRoom={meetingRoom} />);
    actions.push({ ...location, pathname: `/${location.pathname}/${id}` });
  };

  const renderAdditionInformation = () => {
    const offlineMarkerPos = `${(parseShape(coordinates).height.replace('%', '') * 10 - 20) / 10}%`;

    return (
      <svg y={offlineMarkerPos}>
        <OfflineBolt className={computedStyles.offlineMarker} />
      </svg>
    );
  };

  return (
    <svg className={computedStyles.base} {...parsePosition(coordinates)} onClick={onClick}>
      <rect {...parseShape(coordinates)} />
      <rect className={computedStyles.pinged} {...parseShape(coordinates)} />
      <svg className={computedStyles.textContainer}>
        <text dx={ROOM_NAME_TEXT_DX} dy={ROOM_NAME_TEXT_DY} {...parseShape(coordinates)}>
          {name}
        </text>
      </svg>
      {temperature}
      {renderAdditionInformation()}
    </svg>
  );
};

MeetingRoom.propTypes = {
  displayAdditionalInfo: PropTypes.bool.isRequired,
  getLocationParams: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    emitModalContentUpdate: PropTypes.func.isRequired
  }).isRequired,
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired,
    textContainer: PropTypes.object.isRequired,
    pinged: PropTypes.object.isRequired,
    offlineMarker: PropTypes.object.isRequired
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
    connectionStatus: PropTypes.bool.isRequired
  }).isRequired,
  unitOfTemp: PropTypes.string.isRequired,
  displayTemp: PropTypes.bool,
  onLayoutReset: PropTypes.func.isRequired,
  ping: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
};

// export default withStyles(stylesGenerator)(MeetingRoom);
export default withStyles(stylesGenerator)(MeetingRoom);
