import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';

import { AppBar, LeftNav } from 'material-ui/lib';

import MenuButton from './menu-button';
import LeftNavContent from './left-nav-content';
import LocationModal from './location-modal';

import { applyStyles } from '../../config/composition';
import { styles } from './styles';

const NavigationController = (props) => { // TODO
  const { actions, navigation } = props;
  const { siteNavOpen } = navigation.toJS();
  const toggleSiteNavOpen = actions.emitSiteNavToggle.bind(null, !siteNavOpen);

  return (
    <div>
      <AppBar
        title='Office Insight'
        iconElementLeft={<MenuButton toggleSiteNavOpen={toggleSiteNavOpen}/>}
        titleStyle={styles.appTitle}
        style={styles.appBar}/>
      <LeftNav open={siteNavOpen}>
        <LeftNavContent toggleSiteNavOpen={toggleSiteNavOpen}/>
      </LeftNav>
      <LocationModal {...props}/>
    </div>
  );
};

NavigationController.propTypes = {
  actions: PropTypes.object.isRequired,
  navigation: ImmutablePropTypes.Map.isRequired,
  locations: PropTypes.array
};

export default applyStyles(NavigationController);
