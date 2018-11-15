import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withstyles';

import Draggable from 'react-draggable';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { colors } from 'components/common/styles';
import { STATUS_COLORS } from 'client/constants';
import stylesGenerator from './styles';

const MapLegend = ({
  computedStyles,
  actions,
  showYouAreHere,
  displayLegend,
  enableMotion,
  enableStalls
}) => {
  // if (!displayLegend) {
  //   return null;
  // }

  const genIcon = (color) => (
    <svg height='40' width='50'>
      <rect x='0' y='0' width='40' height='40' fill={color} />
    </svg>
  );

  const youAreHereListItem = showYouAreHere ? (
    <ListItem>
      <Avatar>
        <Icon className={computedStyles.icon(colors.secondary)}>place</Icon>
      </Avatar>
      You are here
    </ListItem>
  ) : null;

  return (
    <Draggable bounds='#floor-plan-root' handle='.map-legend-handle'>
      <div id='map-legend' className={computedStyles.base}>
        <List className={computedStyles.mapLegend}>
          <div className='map-legend-handle'>
            <span className='grippy' />
            <div className={computedStyles.closeButton}>
              <IconButton
                aria-label='Close'
                onClick={actions.emitToggleDisplayLegend.bind(null, displayLegend)}>
                <CloseIcon fontSize='small' />
              </IconButton>
            </div>
          </div>
          {youAreHereListItem}
          <ListItem>{genIcon(STATUS_COLORS.OFFLINE)} Offline</ListItem>
          <ListItem>{genIcon(STATUS_COLORS.BOOKED)} Booked</ListItem>
          {enableMotion || enableStalls ? (
            <Fragment>
              <ListItem key='squatted'>{genIcon(STATUS_COLORS.SQUATTED)} Squatted</ListItem>
              <ListItem key='abandonded'>{genIcon(STATUS_COLORS.ABANDONED)} Abandoned</ListItem>
            </Fragment>
          ) : null}
          <ListItem>{genIcon(STATUS_COLORS.VACANT)} Vacant</ListItem>
          <ListItem>{genIcon(STATUS_COLORS.FIVE_MINUTE_WARNING)} Five minute warning</ListItem>
          <ListItem>{genIcon(STATUS_COLORS.ONE_MINUTE_WARNING)} One minute warning</ListItem>
        </List>
      </div>
    </Draggable>
  );
};

MapLegend.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired,
    closeButton: PropTypes.object.isRequired,
    mapLegend: PropTypes.object.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    emitToggleDisplayLegend: PropTypes.func.isRequired
  }).isRequired,
  displayLegend: PropTypes.bool.isRequired,
  showYouAreHere: PropTypes.bool.isRequired,
  enableMotion: PropTypes.bool.isRequired,
  enableStalls: PropTypes.bool.isRequired
};

export default withStyles(stylesGenerator)(MapLegend);
