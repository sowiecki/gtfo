/* eslint new-cap:0 */
import express from 'express';
import find from 'lodash/collection/find';

import devicesController from '../controllers/devices';
import markersController from '../controllers/markers';
import store from '../store/configure-store';

import { EMIT_ROOM_PING_UPDATE } from '../ducks/rooms';

const router = express.Router();
const rooms = devicesController.getRooms();
const markers = markersController.getMarkers();

/* Individual room status */
router.get('/api/rooms/:id', (req, res) => {
  const { id } = req.params;
  const room = find(rooms, {id});

  res.json(room);
});

/* Room statuses */
router.get('/api/rooms', (req, res) => {
  res.json(rooms);
});

/* Room pings */
router.get('/api/ping/:id', (req, res) => { // TODO change to post
  const { id } = req.params;
  const room = find(rooms, {id});

  if (room) {
    store().dispatch({
      type: EMIT_ROOM_PING_UPDATE,
      room
    });
    res.json({
      status: 200
    });
  } else {
    res.json({
      status: 404,
      error: {
        message: 'Room not found'
      }
    });
    // TODO emit room not found, move error message to constants
  }
});

/* Map markers */
router.post('/api/mark/:TODO', (req, res) => {
  res.json(markers);
});

router.post('/api/mark/:TODO', (req, res) => {
  res.json(markers);
});

/* Serve client - must be last route */
router.get('*', (req, res) => {
  res.render('application');
});

export default router;
