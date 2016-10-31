import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NavigationController from './controller';

import * as LayoutActions from '../../ducks/layout';
import * as NavigationActions from '../../ducks/navigation';

const mapStateToProps = (state) => {
  const { navigationReducer, layoutReducer } = state;

  return {
    documentTitle: navigationReducer.get('documentTitle'),
    deviceWidth: navigationReducer.get('deviceWidth'),
    siteNavOpen: navigationReducer.get('siteNavOpen'),
    locationModalOpen: navigationReducer.get('locationModalOpen'),
    timeTravelControlsOpen: navigationReducer.get('timeTravelControlsOpen'),
    timeTravelTime: navigationReducer.get('timeTravelTime'),
    timeSliderValue: navigationReducer.get('timeSliderValue'),
    locations: layoutReducer.get('locations'),
    displayLegend: layoutReducer.get('displayLegend'),
    displayTemp: layoutReducer.get('displayTemp'),
    enableTemp: layoutReducer.get('enableTemp'),
    unitOfTemp: layoutReducer.get('unitOfTemp')
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = {
    ...LayoutActions,
    ...NavigationActions
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationController);
