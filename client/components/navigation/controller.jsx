import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';

import Drawer from 'material-ui/Drawer';

import Header from './header';
import DrawerContent from './drawer-content';
import LocationModal from './location-modal';

import { base } from '../../config/composition';
import { LEFT_HAND_NAV_WIDTH } from './styles';

class NavigationController extends Component {
  componentWillReceiveProps(nextProps) {
    const { documentTitle } = nextProps.navigation.toJS();

    document.title = documentTitle;
  }

  render() {
    const { actions,
            navigation,
            locations,
            location,
            displayLegend,
            displayTemp,
            tempScale } = this.props;
    const { siteNavOpen, locationModalOpen } = navigation.toJS();
    const toggleSiteNav = actions.emitSiteNavToggle.bind(null, !siteNavOpen);
    const toggleLocationModal = actions.emitLocationModalToggle.bind(null, locationModalOpen);
    const toggleDisplayLegend = actions.emitToggleDisplayLegend.bind(null, displayLegend);
    const toggleDisplayTemp = actions.emitToggleDisplayTemp.bind(null, displayTemp);
    const toggleTempScale = actions.emitToggleTempScale.bind(null, tempScale);

    return !locations ? null : (
      <div>
        <Header {...this.props}/>
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
    );
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

export default base(NavigationController);
