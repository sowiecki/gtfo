import React, { Component, PropTypes } from 'react';
import ReactCSSTransition from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OfficeLayoutController from '../components/office-layout/controller';
import Loading from '../components/common/loading';

import * as RoomsActions from '../ducks/rooms';

class RoomsContainer extends Component {
  constructor(props) {
    super(props);

    this.hasRoomsData = this.hasRoomsData.bind(this);
  }

  componentWillMount() {
    const { fetchRoomStatuses } = this.props.actions;

    fetchRoomStatuses();
  }

  hasRoomsData() {
    const { rooms } = this.props;

    return rooms && rooms.size;
  }

  renderRooms() {
    return (
      <OfficeLayoutController {...this.props}/>
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
      <div>
        <ReactCSSTransition
          transitionName='root-container'
          transitionEnterTimeout={3000}
          transitionLeaveTimeout={3000}>
            {loading}
        </ReactCSSTransition>
        {content}
      </div>
    );
  }
}

RoomsContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = ({ rooms }) => ({ rooms });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(RoomsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomsContainer);
