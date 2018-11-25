import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as LayoutActions from 'ducks/layout';
import * as NavigationActions from 'ducks/navigation';
import { formatLocationProps } from 'utils';

import NavigationController from './controller';

const mapStateToProps = ({ navigationReducer, layoutReducer, router }) => ({
  location: formatLocationProps(router.location),
  documentTitle: navigationReducer.get('documentTitle'),
  note: navigationReducer.get('note'),
  deviceWidth: navigationReducer.get('deviceWidth'),
  siteNavOpen: navigationReducer.get('siteNavOpen'),
  timeTravelControlsOpen: navigationReducer.get('timeTravelControlsOpen'),
  timeTravelTime: navigationReducer.get('timeTravelTime'),
  timeSliderValue: navigationReducer.get('timeSliderValue'),
  modalContent: navigationReducer.get('modalContent'),
  timezone: navigationReducer.get('timezone'),
  locations: layoutReducer.get('locations'),
  displayLegend: layoutReducer.get('displayLegend'),
  displayTemp: layoutReducer.get('displayTemp'),
  displayAdditionalInfo: layoutReducer.get('displayAdditionalInfo'),
  enableTemp: layoutReducer.get('enableTemp'),
  unitOfTemp: layoutReducer.get('unitOfTemp')
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
