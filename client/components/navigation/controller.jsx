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
  const { siteNavOpen, locationModalOpen } = navigation.toJS();
  const toggleSiteNav = actions.emitSiteNavToggle.bind(null, !siteNavOpen);
  const toggleLocationModal = actions.emitLocationModalToggle.bind(null, !locationModalOpen);
  const submitLocationUpdate = actions.emitLocationUpdate;

  return (
    <div>
      <AppBar
        title='Office Insight'
        iconElementLeft={<MenuButton toggleSiteNav={toggleSiteNav}/>}
        titleStyle={styles.appTitle}
        style={styles.appBar}/>
      <LeftNav open={siteNavOpen}>
        <LeftNavContent
          toggleSiteNav={toggleSiteNav}
          toggleLocationModal={toggleLocationModal}/>
      </LeftNav>
      <LocationModal
        toggleLocationModal={toggleLocationModal}
        submitLocationUpdate={submitLocationUpdate}
        {...props}/>
    </div>
  );
};

NavigationController.propTypes = {
  actions: PropTypes.shape({
    emitSiteNavToggle: PropTypes.func.isRequired,
    emitLocationModalToggle: PropTypes.func.isRequired,
    emitLocationUpdate: PropTypes.func.isRequired
  }).isRequired,
  navigation: ImmutablePropTypes.Map.isRequired,
  locations: PropTypes.array
};

export default applyStyles(NavigationController);
