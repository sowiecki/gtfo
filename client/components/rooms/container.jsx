import React, { Component, PropTypes } from 'react';
import ReactCSSTransition from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RoomsController from './controller';
import Loading from '../common/loading';

import * as RoomsActions from '../../ducks/rooms';

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
      <div className='container'>
        <ReactCSSTransition
          transitionName='root-container'
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={2000}>
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
