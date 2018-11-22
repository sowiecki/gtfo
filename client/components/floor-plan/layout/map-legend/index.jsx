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

import { colors, STATUS_COLOR_THEMES } from 'components/common/styles';
import { PROP_TYPES } from 'constants';
import stylesGenerator from './styles';

const MapLegend = ({
  computedStyles,
  actions,
  showYouAreHere,
  displayLegend,
  enableMotion,
  enableStalls,
  statusesTheme
}) => {
  if (!displayLegend) {
    return null;
  }

  const renderIcon = (color) => (
    <svg height='40' width='50'>
      <rect className={computedStyles.rect} x='0' y='0' width='40' height='40' fill={color} />
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
          <ListItem>{renderIcon(STATUS_COLOR_THEMES[statusesTheme].OFFLINE)} Offline</ListItem>
          <ListItem>{renderIcon(STATUS_COLOR_THEMES[statusesTheme].BOOKED)} Booked</ListItem>
          {enableMotion || enableStalls ? (
            <Fragment>
              <ListItem key='squatted'>
                {renderIcon(STATUS_COLOR_THEMES[statusesTheme].SQUATTED)} Squatted
              </ListItem>
              <ListItem key='abandonded'>
                {renderIcon(STATUS_COLOR_THEMES[statusesTheme].ABANDONED)} Abandoned
              </ListItem>
            </Fragment>
          ) : null}
          <ListItem>{renderIcon(STATUS_COLOR_THEMES[statusesTheme].VACANT)} Vacant</ListItem>
          <ListItem>
            {renderIcon(STATUS_COLOR_THEMES[statusesTheme].FIVE_MINUTE_WARNING)} Five minute warning
          </ListItem>
          <ListItem>
            {renderIcon(STATUS_COLOR_THEMES[statusesTheme].ONE_MINUTE_WARNING)} One minute warning
          </ListItem>
        </List>
      </div>
    </Draggable>
  );
};

MapLegend.propTypes = {
  computedStyles: PropTypes.shape({
    base: PropTypes.object.isRequired,
    closeButton: PropTypes.object.isRequired,
    mapLegend: PropTypes.object.isRequired,
    rect: PropTypes.object.isRequired,
    icon: PropTypes.func.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    emitToggleDisplayLegend: PropTypes.func.isRequired
  }).isRequired,
  displayLegend: PropTypes.bool.isRequired,
  showYouAreHere: PropTypes.bool.isRequired,
  enableMotion: PropTypes.bool.isRequired,
  enableStalls: PropTypes.bool.isRequired,
  statusesTheme: PROP_TYPES.statusesTheme
};

export default withStyles(stylesGenerator)(MapLegend);
