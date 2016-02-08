import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'immutable-props';
import ReactCSSTransition from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RoomsController from './controller';
import Loading from '../common/loading';
import DisplayError from '../common/display-error';

import * as RoomsActions from '../../ducks/layout';
import { TRANSITION_ENTER_TIMEOUT, TRANSITION_EXIT_TIMEOUT } from '../common/styles';

class LayoutContainer extends Component {
  componentWillMount() {
    const { actions } = this.props;

    actions.connectLayoutSocket();
  }

  renderRooms() {
    return (
      <RoomsController {...this.props}/>
    );
  }

  renderLoading() {
    return (
      <Loading/>
    );
  }

  render() {
    const { layout } = this.props;

    return (
      <span>
        <DisplayError {...this.props}/>
        <ReactCSSTransition
          transitionName='root-container'
          transitionEnterTimeout={TRANSITION_ENTER_TIMEOUT}
          transitionLeaveTimeout={TRANSITION_EXIT_TIMEOUT}>
            {!layout.has('meetingRooms') ? this.renderLoading() : null}
        </ReactCSSTransition>
        {layout.has('meetingRooms') ? this.renderRooms() : null}
      </span>
    );
  }
}

LayoutContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  layout: ImmutablePropTypes.Map.isRequired
};

const mapStateToProps = ({ layoutReducer }) => ({ layout: layoutReducer });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(RoomsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutContainer);
