import React, { PropTypes } from 'react';

import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import history from '../../config/history';
import { base } from '../../config/composition';
import { styles } from './styles';

const DrawerContent = (props) => {
  const { siteNavOpen,
          location,
          actions,
          displayLegend,
          displayTemp,
          enableTemp,
          tempScale,
          timeTravelControlsOpen } = props;

  const fullScreenParams = {
    pathname: location.pathname,
    query: {
      fullscreen: true,
      ...location.query
    }
  };

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
      onClick={actions.emitToggleTempScale.bind(null, tempScale)}
      style={displayTemp ? null : styles.fadedIcon}
      leftIcon={generateIcon(tempScale[0].toUpperCase(), styles.tempScaleNavIcon)}
      primaryText='Toggle fahrenheit/celcius'/>
  ];

  return (
    <List>
      <ListItem
        onClick={() => {
          actions.emitTimeTravelControlsToggle(!timeTravelControlsOpen);
          actions.emitToggleSiteNav(false);
        }}
        leftIcon={generateIcon('schedule', styles.navIcons)}
        primaryText='View future availabilities'/>
      <Divider/>
      <ListItem
        onClick={actions.emitToggleDisplayLegend.bind(null, displayLegend)}
        style={displayLegend ? null : styles.fadedIcon}
        leftIcon={generateIcon('map', styles.navIcons)}
        primaryText='Toggle map legend'/>
      {enableTemp ? temperatureOptions : null}
      <ListItem
        onClick={() => history.push(fullScreenParams)}
        leftIcon={generateIcon('fullscreen', styles.navIcons)}
        primaryText='Open fullscreen'/>
      <Divider/>
      <ListItem
        onClick={actions.emitToggleSiteNav.bind(null, !siteNavOpen)}
        leftIcon={generateIcon('clear', styles.navIcons)}
        primaryText='Close'/>
    </List>
  );
};

DrawerContent.propTypes = {
  siteNavOpen: PropTypes.bool.isRequired,
  timeTravelControlsOpen: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    emitToggleSiteNav: PropTypes.func.isRequired,
    emitToggleDisplayLegend: PropTypes.func.isRequired,
    emitTimeTravelControlsToggle: PropTypes.func.isRequired,
    emitToggleTempScale: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.object,
  displayLegend: PropTypes.bool.isRequired,
  displayTemp: PropTypes.bool.isRequired,
  enableTemp: PropTypes.bool.isRequired,
  tempScale: PropTypes.string.isRequired
};

export default base(DrawerContent);
