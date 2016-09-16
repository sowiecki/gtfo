import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RoomsController from './controller';

import * as RoomsActions from '../../ducks/layout';

class LayoutContainer extends Component {
  componentWillMount() {
    const { actions, location } = this.props;

    actions.connectSocket(location.query);
  }

  render() {
    return (
      <RoomsController {...this.props}/>
    );
  }
}

LayoutContainer.propTypes = {
  layout: ImmutablePropTypes.Map,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = ({ layoutReducer }) => ({
  error: layoutReducer.get('error'),
  meetingRooms: layoutReducer.get('meetingRooms'),
  ping: layoutReducer.get('ping'),
  stalls: layoutReducer.get('stalls'),
  markers: layoutReducer.get('markers'),
  displayLegend: layoutReducer.get('displayLegend'),
  displayTemp: layoutReducer.get('displayTemp'),
  enableMotion: layoutReducer.get('enableMotion'),
  unitOfTemp: layoutReducer.get('unitOfTemp')
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(RoomsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutContainer);
