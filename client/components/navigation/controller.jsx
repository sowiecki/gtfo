import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';

import Drawer from 'material-ui/Drawer';
import Tab from 'material-ui/Tabs/Tab';
import Tabs from 'material-ui/Tabs/Tabs';
import Toolbar from 'material-ui/Toolbar';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';

import MenuButton from './menu-button';
import DrawerContent from './drawer-content';
import LocationModal from './location-modal';

import { formatForDisplay } from '../../utils';
import { applyStyles } from '../../config/composition';
import { styles, LEFT_HAND_NAV_WIDTH } from './styles';

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
    const { actions,
            navigation,
            locations,
            displayLegend,
            displayTemp,
            tempScale,
            params } = this.props;
    const { siteNavOpen, locationModalOpen } = navigation.toJS();
    const toggleSiteNav = actions.emitSiteNavToggle.bind(null, !siteNavOpen);
    const toggleLocationModal = actions.emitLocationModalToggle.bind(null, locationModalOpen);
    const toggleDisplayLegend = actions.emitToggleDisplayLegend.bind(null, displayLegend);
    const toggleDisplayTemp = actions.emitToggleDisplayTemp.bind(null, displayTemp);
    const toggleTempScale = actions.emitToggleTempScale.bind(null, tempScale);

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
        <Drawer
          open={siteNavOpen}
          onRequestChange={toggleSiteNav}
          docked={false}
          width={LEFT_HAND_NAV_WIDTH}>
            <DrawerContent
              toggleSiteNav={toggleSiteNav}
              toggleLocationModal={toggleLocationModal}
              toggleDisplayLegend={toggleDisplayLegend}
              toggleDisplayTemp={toggleDisplayTemp}
              toggleTempScale={toggleTempScale}
              displayLegend={displayLegend}
              displayTemp={displayTemp}
              tempScale={tempScale}
              location={location}/>
        </Drawer>
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
    emitToggleDisplayLegend: PropTypes.func.isRequired,
    emitToggleDisplayTemp: PropTypes.func.isRequired,
    emitToggleTempScale: PropTypes.func.isRequired
  }).isRequired,
  navigation: ImmutablePropTypes.Map.isRequired,
  location: PropTypes.shape({
    query: PropTypes.object
  }),
  displayLegend: PropTypes.bool.isRequired,
  displayTemp: PropTypes.bool.isRequired,
  tempScale: PropTypes.string.isRequired,
  locations: PropTypes.array,
  params: PropTypes.object.isRequired
};

export default applyStyles(NavigationController);
