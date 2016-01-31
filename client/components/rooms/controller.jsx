import React, { Component } from 'react';
import radium from 'radium';
import { List } from 'immutable-props';

import Paper from 'material-ui/lib/paper';

import Room from './room';

import styles from './styles';

class RoomsController extends Component {
  renderChunk(room) {
    // if (chunk.name === 'Wrigleyville') {
    //   chunk.shape = {
    //     height: 6.6,
    //     width: 7.6,
    //     x: 73.5,
    //     y: 38.6
    //   }
    // }

    return (
      <Room key={`${room.outlookAccount}-chunk`} room={room}/>
    );
  }

  render() {
    const rooms = this.props.rooms.toJS();
    // console.table(rooms);
    return (
      <Paper style={styles.officeLayoutContainer} zDepth={1}>
        <svg className='office-layout'>
          {rooms.map(this.renderChunk)}
        </svg>
      </Paper>
    );
  }
}

RoomsController.propTypes = {
  rooms: List
};

export default radium(RoomsController);
