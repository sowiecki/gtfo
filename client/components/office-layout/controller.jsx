import React, { Component, PropTypes } from 'react';

import SVGBase from './svg/base';

export default class RoomsController extends Component {
  renderChunk(chunk) {
    return (
      <SVGBase key={`${chunk.outlookAccount}-chunk`} height="50" width="50">
        <rect {...chunk.shape} />
      </SVGBase>
    );
  }

  render() {
    const rooms = this.props.rooms.toJS();

    return (
      <div>
        {rooms.map(this.renderChunk)}
      </div>
    );
  }
}

RoomsController.propTypes = {
  rooms: PropTypes.object
};
