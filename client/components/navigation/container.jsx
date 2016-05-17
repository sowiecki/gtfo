import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NavigationController from './controller';

import * as LayoutActions from '../../ducks/layout';
import * as NavigationActions from '../../ducks/navigation';

const NavigationContainer = (props) => (
  <NavigationController {...props}/>
);

NavigationContainer.propTypes = {
  navigation: ImmutablePropTypes.Map,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { navigationReducer, layoutReducer } = state;

  return {
    documentTitle: navigationReducer.get('documentTitle'),
    siteNavOpen: navigationReducer.get('siteNavOpen'),
    locationModalOpen: navigationReducer.get('locationModalOpen'),
    timeTravelControlsOpen: navigationReducer.get('timeTravelControlsOpen'),
    timeTravelError: navigationReducer.get('timeTravelError'),
    timeTravelledTo: navigationReducer.get('timeTravelledTo'),
    locations: layoutReducer.get('locations'),
    displayLegend: layoutReducer.get('displayLegend'),
    displayTemp: layoutReducer.get('displayTemp'),
    enableTemp: layoutReducer.get('enableTemp'),
    tempScale: layoutReducer.get('tempScale')
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
)(NavigationContainer);
