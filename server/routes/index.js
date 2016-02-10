/* eslint new-cap:0 */
import express from 'express';
import find from 'lodash/collection/find';

import devicesController from '../controllers/devices';
import markersController from '../controllers/markers';
import store from '../store/configure-store';

import { EMIT_ROOM_PING_RECEIVED } from '../ducks/rooms';

const router = express.Router();
const rooms = devicesController.getRooms();
const markers = markersController.getMarkers();

const getHost = (req) => req.headers.host.slice(0, -5);

/* Room pings */
router.post('/api/ping/:id', (req, res) => {
  const { id } = req.params;
  const room = find(rooms, {id});

  if (room) {
    // TODO break out into new file
    store().dispatch({
      type: EMIT_ROOM_PING_RECEIVED,
      ping: {
        origin: getHost(req),
        id,
        room
      }
    });
    res.json({ status: 200 });
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
