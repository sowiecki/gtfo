import React, { Component, PropTypes } from 'react';
import slug from 'slug';

import SVGBase from './svg/base';
import { shapeModifier } from '../../utils/room-layout';

// Configuration for slug to map alert classes
slug.charmap._ = '-';

export default class RoomsController extends Component {
  renderChunk(chunk) {
    return (
      <SVGBase
        key={`${chunk.outlookAccount}-chunk`}
        className={slug(chunk.alert, {lower: true})}
        {...shapeModifier(chunk.shape)}/>
    );
  }

  render() {
    const rooms = this.props.rooms.toJS();
    // console.table(rooms);
    return (
      <div className='layout-root'>
        {rooms.map(this.renderChunk)}
      </div>
    );
  }
}

RoomsController.propTypes = {
  rooms: PropTypes.object
};
