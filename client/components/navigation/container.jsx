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
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  navigation: ImmutablePropTypes.Map.isRequired
};

const mapStateToProps = (state) => {
  const { navigationReducer, layoutReducer } = state;

  return {
    navigation: navigationReducer,
    locations: layoutReducer.get('locations'),
    displayLegend: layoutReducer.get('displayLegend'),
    displayTemp: layoutReducer.get('displayTemp')
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
