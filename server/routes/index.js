/* eslint new-cap:0, dot-notation:0 */
import express from 'express';
import find from 'lodash/collection/find';

import * as config from '../config';
import store from '../store/configure-store';

const router = express.Router();
const { rooms } = store().getState();

/* Show room status */
router.get('/api/rooms/:outlookAccount', (req, res) => {
  const outlookAccount = `${req.params['outlookAccount']}@slalom.com`;
  const roomState = find(rooms, {outlookAccount});

  res.json(JSON.stringify(roomState));
});

/* Serve client - must be last route */
router.get('*', (req, res) => {
  res.render('application', {
    port: config.clientPort
  });
});

export default router;
