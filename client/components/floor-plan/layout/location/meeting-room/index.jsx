import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import OfflineBolt from '@material-ui/icons/OfflineBolt';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import RoomModal from 'components/floor-plan/layout/room-modal';
import { ROOM_NAME_TEXT_POSITIONS, PROP_TYPES } from 'client/constants';
import { parsePosition, parseShape, getWidthModifier, formatTempText } from 'utils';
// import Temperature from './temperature';
import stylesGenerator from './styles';

const MeetingRoom = (props) => {
  const { computedStyles, actions, location, meetingRoom, onLayoutReset } = props;
  const { id, name, description, coordinates } = meetingRoom;
  const parsedShape = parseShape(coordinates);
  const widthModifier = getWidthModifier(coordinates.width);

  const onClick = () => {
    onLayoutReset();
    actions.emitModalContentUpdate(<RoomModal {...props} meetingRoom={meetingRoom} />);
    actions.push({ ...location, pathname: `/${location.pathname}/${id}` });
  };

  const renderAdditionInformation = () => {
    const yPosition = `${(parsedShape.height.replace('%', '') * 10 - 20) / 10}%`;

    return (
      <svg y={yPosition}>
        <OfflineBolt className={computedStyles.offlineMarker} />
      </svg>
    );
  };

  // TODO https://github.com/Nase00/gtfo/issues/160
  // const renderTemperature = () => {
  //   const yPosition = `${(parsedShape.height.replace('%', '') * 10 - 60) / 10}%`;

  //   return <Temperature {...props} yPosition={yPosition} widthModifier={widthModifier} />;
  // };

  const renderName = () =>
    (name.length > coordinates.width * 1.4 ? (
      name.split(' ').map((partial, i) => (
        <text
          key={partial}
          dx={ROOM_NAME_TEXT_POSITIONS[widthModifier].dx}
          dy={ROOM_NAME_TEXT_POSITIONS[widthModifier].dy + i * 12}
          {...parsedShape}>
          {partial}
        </text>
      ))
    ) : (
      <text {...ROOM_NAME_TEXT_POSITIONS[widthModifier]} {...parsedShape}>
        {name}
      </text>
    ));

  const renderToolTip = () => (
    <Fragment>
      <div>{name}</div>
      {description ? <div>{description}</div> : null}
      <div>{formatTempText(meetingRoom)}</div>
    </Fragment>
  );

  return (
    <svg className={computedStyles.base} {...parsePosition(coordinates)} onClick={onClick}>
      <rect {...parseShape(coordinates)} />
      <Tooltip title={renderToolTip()} TransitionComponent={Zoom} placement='top'>
        <rect className={computedStyles.pinged} {...parsedShape} />
      </Tooltip>
      <svg className={computedStyles.textContainer(widthModifier)}>{renderName()}</svg>
      {/* renderTemperature() */}
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
  meetingRoom: PROP_TYPES.meetingRoom.isRequired,
  unitOfTemp: PropTypes.string.isRequired,
  displayTemp: PropTypes.bool,
  onLayoutReset: PropTypes.func.isRequired,
  ping: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
};

export default withStyles(stylesGenerator)(MeetingRoom);
