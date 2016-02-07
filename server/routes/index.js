/* eslint new-cap:0 */
import express from 'express';
import find from 'lodash/collection/find';

import devicesController from '../controllers/devices';
import markersController from '../controllers/markers';

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

/* Map markers */
router.get('/api/markers', (req, res) => {
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
