import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NavigationController from './controller';

import * as NavigationActions from '../../ducks/navigation';

class NavigationContainer extends Component {
  render() {
    return (
      <NavigationController {...this.props}/>
    );
  }
}

NavigationContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  navigation: ImmutablePropTypes.Map.isRequired
};

const mapStateToProps = ({ navigation }) => ({ navigation });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(NavigationActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationContainer);
