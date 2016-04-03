import React, { PropTypes } from 'react';
import history from '../../config/history';

import { FontIcon, Divider } from 'material-ui/lib';
import { List, ListItem } from 'material-ui/lib/lists';

import { base } from '../../config/composition';
import { styles } from './styles';

const LeftNavContent = (props) => {
  const { location,
          toggleLocationModal,
          toggleSiteNav,
          toggleDisplayLegend,
          toggleDisplayTemp,
          toggleTempScale,
          displayLegend,
          displayTemp,
          tempScale } = props;

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

  return (
    <List>
      <ListItem
        onClick={toggleLocationModal}
        leftIcon={generateIcon('place', styles.navIcons)}
        primaryText='Edit Location'/>
      <ListItem
        onClick={() => history.push(fullScreenParams)}
        leftIcon={generateIcon('fullscreen', styles.navIcons)}
        primaryText='Open fullscreen'/>
      <Divider/>
      <ListItem
        onClick={toggleDisplayLegend}
        style={displayLegend ? null : styles.fadedIcon}
        leftIcon={generateIcon('map', styles.navIcons)}
        primaryText='Toggle map legend'/>
      <ListItem
        onClick={toggleDisplayTemp}
        style={displayTemp ? null : styles.fadedIcon}
        leftIcon={generateIcon('ac_unit', styles.navIcons)}
        primaryText='Toggle temperature display'/>
      <ListItem
        onClick={toggleTempScale}
        style={displayTemp ? null : styles.fadedIcon}
        leftIcon={generateIcon(tempScale[0].toUpperCase(), styles.tempScaleNavIcon)}
        primaryText='Toggle fahrenheit/celcius'/>
      <Divider/>
      <ListItem
        onClick={toggleSiteNav}
        leftIcon={generateIcon('clear', styles.navIcons)}
        primaryText='Close'/>
    </List>
  );
};

LeftNavContent.propTypes = {
  location: PropTypes.object,
  toggleLocationModal: PropTypes.func.isRequired,
  toggleSiteNav: PropTypes.func.isRequired,
  toggleDisplayLegend: PropTypes.func.isRequired,
  toggleDisplayTemp: PropTypes.func.isRequired,
  toggleTempScale: PropTypes.func.isRequired,
  displayLegend: PropTypes.bool.isRequired,
  displayTemp: PropTypes.bool.isRequired,
  tempScale: PropTypes.string.isRequired
};

export default base(LeftNavContent);
