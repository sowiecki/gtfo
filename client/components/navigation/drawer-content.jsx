/* eslint react/no-danger:0 */
import React from 'react';
import PropTypes from 'prop-types';

import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import CardText from 'material-ui/Card/CardText';

import { base } from 'config/composition';

import { styles } from './styles';

const DrawerContent = (props) => {
  const { note,
          onViewFutureAvailabilitiesClick,
          onOpenFullscreenClick,
          siteNavOpen,
          actions,
          displayLegend,
          displayTemp,
          enableTemp,
          unitOfTemp } = props;

  const generateIcon = (icon, style) => (
    <FontIcon className='material-icons' style={style}>{icon}</FontIcon>
  );

  const temperatureOptions = [
    <ListItem
      key='toggle-temp-display'
      onClick={actions.emitToggleDisplayTemp.bind(null, displayTemp)}
      style={displayTemp ? null : styles.fadedIcon}
      leftIcon={generateIcon('ac_unit', styles.navIcons)}
      primaryText='Toggle temperature display'/>,
    <ListItem
      key='toggle-temp-scale'
      onClick={actions.emitToggleTempScale.bind(null, unitOfTemp)}
      style={displayTemp ? null : styles.fadedIcon}
      leftIcon={generateIcon(unitOfTemp[0].toUpperCase(), styles.tempScaleNavIcon)}
      primaryText='Toggle fahrenheit/celcius'/>
  ];

  return (
    <List>
      <ListItem
        onClick={onViewFutureAvailabilitiesClick}
        leftIcon={generateIcon('schedule', styles.navIcons)}
        primaryText='View future availabilities'/>
      <Divider/>
      <ListItem
        id='toggle-map-legend'
        onClick={actions.emitToggleDisplayLegend.bind(null, displayLegend)}
        style={displayLegend ? null : styles.fadedIcon}
        leftIcon={generateIcon('map', styles.navIcons)}
        primaryText='Toggle map legend'/>
      {enableTemp ? temperatureOptions : null}
      <ListItem
        onClick={onOpenFullscreenClick}
        leftIcon={generateIcon('fullscreen', styles.navIcons)}
        primaryText='Open fullscreen'/>
      <Divider/>
      <ListItem
        onClick={actions.emitToggleSiteNav.bind(null, !siteNavOpen)}
        leftIcon={generateIcon('clear', styles.navIcons)}
        primaryText='Close'/>
      <CardText style={styles.note}>
        <span dangerouslySetInnerHTML={{ __html: note }}/>
      </CardText>
    </List>
  );
};

DrawerContent.propTypes = {
  note: PropTypes.string.isRequired,
  onViewFutureAvailabilitiesClick: PropTypes.func.isRequired,
  onOpenFullscreenClick: PropTypes.func.isRequired,
  siteNavOpen: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    emitToggleSiteNav: PropTypes.func.isRequired,
    emitToggleDisplayLegend: PropTypes.func.isRequired,
    emitToggleTempScale: PropTypes.func.isRequired
  }).isRequired,
  displayLegend: PropTypes.bool.isRequired,
  displayTemp: PropTypes.bool.isRequired,
  enableTemp: PropTypes.bool.isRequired,
  unitOfTemp: PropTypes.string.isRequired
};

export default base(DrawerContent);
