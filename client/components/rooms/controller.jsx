import React, { Component, PropTypes } from 'react';

import SVGBase from './svg/base';

export default class RoomsController extends Component {
  renderChunk(chunk) {
    // console.log(chunk);
    return (
      <SVGBase key={`${chunk.outlookAccount}-chunk`} {...chunk.shape}>
        <rect {...chunk.shape} />
      </SVGBase>
    );
  }

  render() {
    const rooms = this.props.rooms.toJS();
    // console.table(rooms);
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
