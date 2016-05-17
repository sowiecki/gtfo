import React, { Component, PropTypes } from 'react';

import Drawer from 'material-ui/Drawer';

import Header from './header';
import DrawerContent from './drawer-content';
import LocationModal from './location-modal';
import TimeTravel from './time-travel';

import { base } from '../../config/composition';
import { LEFT_HAND_NAV_WIDTH } from './styles';

class NavigationController extends Component {
  componentWillReceiveProps(nextProps) {
    document.title = nextProps.documentTitle;
  }

  render() {
    const { actions, locations, siteNavOpen } = this.props;

    return !locations ? null : (
      <div>
        <Header {...this.props}/>
        <Drawer
          open={siteNavOpen}
          onRequestChange={actions.emitToggleSiteNav.bind(null, !siteNavOpen)}
          docked={false}
          width={LEFT_HAND_NAV_WIDTH}>
            <DrawerContent {...this.props}/>
        </Drawer>
        <TimeTravel {...this.props}/>
        <LocationModal {...this.props}/>
      </div>
    );
  }
}

NavigationController.propTypes = {
  siteNavOpen: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    emitToggleSiteNav: PropTypes.func.isRequired,
    emitLocationModalToggle: PropTypes.func.isRequired,
    emitLocationUpdate: PropTypes.func.isRequired,
    emitToggleDisplayLegend: PropTypes.func.isRequired,
    emitToggleDisplayTemp: PropTypes.func.isRequired,
    emitToggleTempScale: PropTypes.func.isRequired
  }).isRequired,
  locations: PropTypes.array
};

export default base(NavigationController);
