import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';

import { ToolbarTitle,
         Toolbar,
         ToolbarGroup,
         Tabs,
         Tab,
         LeftNav } from 'material-ui/lib';

import MenuButton from './menu-button';
import LeftNavContent from './left-nav-content';
// import LocationModal from './location-modal';

import { formatForDisplay } from '../../utils/rooms';
import { applyStyles } from '../../config/composition';
import { styles } from './styles';

// TODO change from hardcoded
const locationIndexes = {
  ['two-prudential-51']: 0,
  ['two-prudential-53']: 1
};

const NavigationController = (props) => {
  const { actions, navigation, params/*, locations // TODO */ } = props;
  const { siteNavOpen, locationModalOpen } = navigation.toJS();
  const toggleSiteNav = actions.emitSiteNavToggle.bind(null, !siteNavOpen);
  const toggleLocationModal = actions.emitLocationModalToggle.bind(null, !locationModalOpen);
  const locations = ['two-prudential-51', 'two-prudential-53'];

  const renderLocationTab = (location, index) => {
    return (
      <Tab
        key={`${location}-${index}`}
        label={formatForDisplay(location)}
        value={locationIndexes[location]}
        onClick={actions.emitLocationIndexUpdate.bind(null, location, params.id)}
        style={styles.toolbarTab}/>
    );
  };

  return (
    <div>
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup firstChild={true}>
          <MenuButton toggleSiteNav={toggleSiteNav}/>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text='Office Insight' style={styles.toolbarTitle}/>
        </ToolbarGroup>
        <ToolbarGroup style={styles.toolbarTabs}>
          <Tabs
            value={locationIndexes[params.location]}>
              {locations.map(renderLocationTab)}
          </Tabs>
        </ToolbarGroup>
      </Toolbar>
      <LeftNav open={siteNavOpen}>
        <LeftNavContent
          toggleSiteNav={toggleSiteNav}
          toggleLocationModal={toggleLocationModal}/>
      </LeftNav>
      {/*<LocationModal
        toggleLocationModal={toggleLocationModal}
        submitLocationUpdate={submitLocationUpdate}
        {...props}/>*/}
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
  locations: PropTypes.array,
  params: PropTypes.object.isRequired
};

export default applyStyles(NavigationController);
