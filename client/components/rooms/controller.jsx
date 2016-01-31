import React, { Component } from 'react';
import { List } from 'immutable-props';
import slug from 'slug';

import Paper from 'material-ui/lib/paper';

import SVGBase from './svg/base';
import { OFFLINE } from '../../constants/svg';
import { shapeModifier } from '../../utils/room-layout';

// Configuration for slug to map alert classes
slug.charmap._ = '-';

export default class RoomsController extends Component {
  renderChunk(chunk) {
    const position = {
      position: 'absolute',
      top: '60%',
      left: '50%'
    };
// console.log(chunk)
    return (
      <SVGBase
        key={`${chunk.outlookAccount}-chunk`}
        style={position}
        className={slug(chunk.alert || OFFLINE, {lower: true})}
        {...shapeModifier(chunk.shape)}/>
    );
  }

  render() {
    const rooms = this.props.rooms.toJS();
    // console.table(rooms);
    return (
      <Paper className='office-layout-container' zDepth={1}>
        <svg>
          {rooms.map(this.renderChunk)}
        </svg>
      </Paper>
    );
  }
}

RoomsController.propTypes = {
  rooms: List
};
