import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NavigationController from './controller';

import * as LayoutActions from '../../ducks/layout';
import * as NavigationActions from '../../ducks/navigation';

const mapStateToProps = ({ navigationReducer, layoutReducer }, props) => ({
  location: { ...props.location, ...navigationReducer.get('location').toJS() },
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
  unitOfTemp: layoutReducer.get('unitOfTemp')
});

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
