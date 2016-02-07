import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MarkerController from './controller';

import * as MarkerActions from '../../ducks/markers';

class MarkerContainer extends Component {
  componentWillMount() {
    const { actions, location } = this.props;
    const { whereAmI } = location.query;

    actions.emitMarkerActivated(whereAmI);
  }

  render() {
    return (
      <MarkerController {...this.props}/>
    );
  }
}

MarkerContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  markers: ImmutablePropTypes.Map.isRequired
};

const mapStateToProps = ({ markers }) => ({ markers });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(MarkerActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkerContainer);
