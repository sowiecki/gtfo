import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';

import RoomModal from './index';

class RoomModalEnable extends PureComponent {
  componentDidMount() {
    const { location, actions } = this.props;
    const { params } = matchPath(location.pathname, {
      path: ':location/:room',
      exact: true,
      strict: false
    });

    actions.emitModalContentUpdate(<RoomModal room={params.room}/>);
  }

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
