import React, { Component, PropTypes } from 'react';
import ReactCSSTransition from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RoomsController from './controller';
import Loading from '../common/loading';

import * as RoomsActions from '../../ducks/rooms';
import { TRANSITION_ENTER_TIMEOUT, TRANSITION_EXIT_TIMEOUT } from '../common/styles';

class RoomsContainer extends Component {
  constructor(props) {
    super(props);

    this.hasRoomsData = this.hasRoomsData.bind(this);
  }

  componentWillMount() {
    const { actions } = this.props;

    actions.fetchRoomStatuses();
  }

  hasRoomsData() {
    const { rooms } = this.props;

    return rooms && rooms.size;
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
    const loading = !this.hasRoomsData() ? this.renderLoading() : null;
    const content = this.hasRoomsData() ? this.renderRooms() : null;

    return (
      <span>
        <ReactCSSTransition
          transitionName='root-container'
          transitionEnterTimeout={TRANSITION_ENTER_TIMEOUT}
          transitionLeaveTimeout={TRANSITION_EXIT_TIMEOUT}>
            {loading}
        </ReactCSSTransition>
        {content}
      </span>
    );
  }
}

RoomsContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  rooms: PropTypes.object
};

const mapStateToProps = ({ rooms }) => ({ rooms });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(RoomsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomsContainer);
