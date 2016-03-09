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
import LocationModal from './location-modal';

import { formatForDisplay } from '../../utils/rooms';
import { applyStyles } from '../../config/composition';
import { styles } from './styles';

const NavigationController = (props) => {
  const { actions, navigation, locations, params } = props;
  const { anchor } = props.location.query;
  const { siteNavOpen, locationModalOpen } = navigation.toJS();
  const toggleSiteNav = actions.emitSiteNavToggle.bind(null, !siteNavOpen);
  const toggleLocationModal = actions.emitLocationModalToggle.bind(null, !locationModalOpen);

  const renderLocationTab = (location, index) => (
    <Tab
      key={`${location}-${index}`}
      label={formatForDisplay(location)}
      value={locations.indexOf(location)}
      onClick={actions.emitLocationIndexUpdate.bind(null, location, anchor)}
      style={styles.toolbarTab}/>
  );

  // TODO better null safety rendering
  return locations ? (
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
            value={locations.indexOf(params.location)}>
              {locations.map(renderLocationTab)}
          </Tabs>
        </ToolbarGroup>
      </Toolbar>
      <LeftNav open={siteNavOpen} docked={false}>
        <LeftNavContent
          toggleSiteNav={toggleSiteNav}
          toggleLocationModal={toggleLocationModal}
          location={params.location}/>
      </LeftNav>
      <LocationModal
        toggleLocationModal={toggleLocationModal}
        {...props}/>
    </div>
  ) : <div/>;
};

NavigationController.propTypes = {
  actions: PropTypes.shape({
    emitSiteNavToggle: PropTypes.func.isRequired,
    emitLocationModalToggle: PropTypes.func.isRequired,
    emitLocationUpdate: PropTypes.func.isRequired
  }).isRequired,
  navigation: ImmutablePropTypes.Map.isRequired,
  location: PropTypes.shape({
    query: PropTypes.object
  }),
  locations: PropTypes.array,
  params: PropTypes.object.isRequired
};

export default applyStyles(NavigationController);
