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
import renderWithCSSTransitionGroup from 'components/common/with-css-transition-group';
import { PROP_TYPES } from 'constants';
import stylesGenerator from './styles';

const MapLegend = ({
  computedStyles,
  actions,
  showYouAreHere,
  enableMotion,
  enableStalls,
  statusesTheme,
  displayAdditionalInfo
}) => {
  const renderIcon = (color) => (
    <svg height='40' width='50'>
      <rect className={computedStyles.rect} x='0' y='0' width='40' height='40' fill={color} />
    </svg>
  );

  const renderAdditionalInfoIcons = () => (
    <ListItem>
      <Avatar>
        <Icon className={computedStyles.icon(colors.DARK_RED)}>offline_bolt</Icon>
      </Avatar>
      Module disconnected
    </ListItem>
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
    <div>
      <Draggable bounds='#floor-plan-root' handle='.map-legend-handle'>
        <div id='map-legend' className={computedStyles.base}>
          <List className={computedStyles.mapLegend}>
            <div className='map-legend-handle'>
              <span className='grippy' />
              <div className={computedStyles.closeButton}>
                <IconButton
                  aria-label='Close'
                  onClick={actions.emitDisplayLegendToggle.bind(null, true)}>
                  <CloseIcon fontSize='small' />
                </IconButton>
              </div>
            </div>
            {youAreHereListItem}
            <ListItem>
              {renderIcon(STATUS_COLOR_THEMES[statusesTheme].OFFLINE)} Data unavailable
            </ListItem>
            <ListItem>{renderIcon(STATUS_COLOR_THEMES[statusesTheme].VACANT)} Vacant</ListItem>
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
            <ListItem>{renderIcon(STATUS_COLOR_THEMES[statusesTheme].BOOKED)} Booked</ListItem>
            <ListItem>
              {renderIcon(STATUS_COLOR_THEMES[statusesTheme].FIVE_MINUTE_WARNING)} Five minute
              warning
            </ListItem>
            <ListItem>
              {renderIcon(STATUS_COLOR_THEMES[statusesTheme].ONE_MINUTE_WARNING)} One minute warning
            </ListItem>
            {renderWithCSSTransitionGroup(
              renderAdditionalInfoIcons,
              displayAdditionalInfo,
              'map-legend-item'
            )}
          </List>
        </div>
      </Draggable>
    </div>
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
    emitDisplayLegendToggle: PropTypes.func.isRequired
  }).isRequired,
  showYouAreHere: PropTypes.bool.isRequired,
  enableMotion: PropTypes.bool.isRequired,
  enableStalls: PropTypes.bool.isRequired,
  displayAdditionalInfo: PropTypes.bool.isRequired,
  statusesTheme: PROP_TYPES.statusesTheme
};

export default withStyles(stylesGenerator)(MapLegend);
