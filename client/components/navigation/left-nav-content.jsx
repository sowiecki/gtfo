import React, { PropTypes } from 'react';
import history from '../../config/history';

import FontIcon from 'material-ui/lib/font-icon';
import { List, ListItem } from 'material-ui/lib/lists';

import { base } from '../../config/composition';
import { styles } from './styles';

const LeftNavContent = (props) => {
  const { location,
          toggleLocationModal,
          toggleSiteNav,
          toggleDisplayLegend,
          toggleDisplayTemp } = props;
  const fullScreenParams = {
    pathname: location.pathname,
    query: {
      fullscreen: true,
      ...location.query
    }
  };

  const placeIcon = (
    <FontIcon className='material-icons' style={styles.navIcons}>place</FontIcon>
  );

  const mapLegendIcon = (
    <FontIcon className='material-icons' style={styles.navIcons}>map</FontIcon>
  );

  const temperatureIcon = (
    <FontIcon className='material-icons' style={styles.navIcons}>ac_unit</FontIcon>
  );

  const fullscreenIcon = (
    <FontIcon className='material-icons' style={styles.navIcons}>fullscreen</FontIcon>
  );

  const closeIcon = (
    <FontIcon className='material-icons' style={styles.navIcons}>clear</FontIcon>
  );

  return (
    <List>
      <ListItem
        onClick={toggleLocationModal}
        leftIcon={placeIcon}
        primaryText='Edit Location'/>
      <ListItem
        onClick={() => history.push(fullScreenParams)}
        leftIcon={fullscreenIcon}
        primaryText='Open fullscreen'/>
      <ListItem
        onClick={toggleDisplayLegend}
        leftIcon={mapLegendIcon}
        primaryText='Toggle map legend'/>
      <ListItem
        onClick={toggleDisplayTemp}
        leftIcon={temperatureIcon}
        primaryText='Toggle temperature display'/>
      <ListItem
        onClick={toggleSiteNav}
        leftIcon={closeIcon}
        primaryText='Close'/>
    </List>
  );
};

LeftNavContent.propTypes = {
  location: PropTypes.object,
  toggleLocationModal: PropTypes.func.isRequired,
  toggleSiteNav: PropTypes.func.isRequired,
  toggleDisplayLegend: PropTypes.func.isRequired,
  toggleDisplayTemp: PropTypes.func.isRequired
};

export default base(LeftNavContent);
