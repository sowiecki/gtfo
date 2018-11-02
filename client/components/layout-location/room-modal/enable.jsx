import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';
import { isEqual } from 'lodash';

import RoomModal from './index';

class RoomModalEnable extends PureComponent {
  componentDidMount() {
    this.modalUpdate();
  }

  componentDidUpdate(nextProps) {
    this.modalUpdate(nextProps);
  }

  modalUpdate = (nextProps = {}) => {
    const { location, actions } = this.props;
    const { params } = matchPath(location.pathname, {
      path: ':location/:room',
      exact: true,
      strict: false
    });
    const roomPathUpdated = !isEqual(location, nextProps.location);

    if (roomPathUpdated) {
      actions.emitModalContentUpdate(<RoomModal room={params.room}/>);
    }
  };

  render() {
    return null;
  }
}

RoomModalEnable.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    emitModalContentUpdate: PropTypes.func.isRequired
  }).isRequired
};

export default RoomModalEnable;
