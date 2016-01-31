/* eslint new-cap:0 */
import express from 'express';
import find from 'lodash/collection/find';

import store from '../store/configure-store';

const router = express.Router();
const { rooms } = store().getState();

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

/* Serve client - must be last route */
router.get('*', (req, res) => {
  res.render('application');
});

export default router;
