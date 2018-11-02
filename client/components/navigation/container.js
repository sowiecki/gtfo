import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as LayoutActions from 'ducks/layout';
import * as NavigationActions from 'ducks/navigation';
import { formatLocationProps } from 'utils';

import NavigationController from './controller';

const mapStateToProps = ({ navigationReducer, layoutReducer, routerReducer }) => ({
  location: formatLocationProps(routerReducer.location),
  documentTitle: navigationReducer.get('documentTitle'),
  note: navigationReducer.get('note'),
  deviceWidth: navigationReducer.get('deviceWidth'),
  siteNavOpen: navigationReducer.get('siteNavOpen'),
  timeTravelControlsOpen: navigationReducer.get('timeTravelControlsOpen'),
  timeTravelTime: navigationReducer.get('timeTravelTime'),
  timeSliderValue: navigationReducer.get('timeSliderValue'),
  locations: layoutReducer.get('locations'),
  displayLegend: layoutReducer.get('displayLegend'),
  displayTemp: layoutReducer.get('displayTemp'),
  enableTemp: layoutReducer.get('enableTemp'),
  unitOfTemp: layoutReducer.get('unitOfTemp'),
  modalContent: navigationReducer.get('modalContent')
});

const mapDispatchToProps = (dispatch) => {
  const actions = {
    ...LayoutActions,
    ...NavigationActions,
    push
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationController);
