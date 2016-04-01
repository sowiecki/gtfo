import React, { Component, PropTypes } from 'react';
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

import { formatForDisplay } from '../../utils';
import { applyStyles } from '../../config/composition';
import { styles } from './styles';

class NavigationController extends Component {
  componentWillReceiveProps(nextProps) {
    const { documentTitle } = nextProps.navigation.toJS();

    document.title = documentTitle;
  }

  renderLocationTab(location, index) {
    const { actions, locations } = this.props;
    const { anchor } = this.props.location.query;

    return (
      <Tab
        key={`${location}-${index}`}
        label={formatForDisplay(location)}
        value={locations.indexOf(location)}
        onClick={actions.emitLocationIndexUpdate.bind(null, location, anchor)}
        style={styles.toolbarTab}/>
    );
  }

  render() {
    const { actions, navigation, locations, displayLegend, params } = this.props;
    const { siteNavOpen, locationModalOpen } = navigation.toJS();
    const toggleSiteNav = actions.emitSiteNavToggle.bind(null, !siteNavOpen);
    const toggleLocationModal = actions.emitLocationModalToggle.bind(null, locationModalOpen);
    const toggleDisplayLegend = actions.emitToggleDisplayLegend.bind(null, displayLegend);

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
                {locations.map(this.renderLocationTab.bind(this))}
            </Tabs>
          </ToolbarGroup>
        </Toolbar>
        <LeftNav
          open={siteNavOpen}
          onRequestChange={toggleSiteNav}
          docked={false}>
            <LeftNavContent
              toggleSiteNav={toggleSiteNav}
              toggleLocationModal={toggleLocationModal}
              toggleDisplayLegend={toggleDisplayLegend}
              location={location}/>
        </LeftNav>
        <LocationModal
          toggleLocationModal={toggleLocationModal}
          {...this.props}/>
      </div>
    ) : <div/>;
  }
}

NavigationController.propTypes = {
  actions: PropTypes.shape({
    emitSiteNavToggle: PropTypes.func.isRequired,
    emitLocationModalToggle: PropTypes.func.isRequired,
    emitLocationUpdate: PropTypes.func.isRequired,
    emitToggleDisplayLegend: PropTypes.func.isRequired
  }).isRequired,
  navigation: ImmutablePropTypes.Map.isRequired,
  location: PropTypes.shape({
    query: PropTypes.object
  }),
  displayLegend: PropTypes.bool.isRequired,
  locations: PropTypes.array,
  params: PropTypes.object.isRequired
};

export default applyStyles(NavigationController);
