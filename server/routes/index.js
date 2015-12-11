/* eslint new-cap:0, dot-notation:0 */
import express from 'express';
import * as config from '../config';
import state from '../state';
// import mockRoomData from '../../mock-data';

const router = express.Router();

/* Show room status */
router.get('/api/rooms/:outlookAccount', (req, res) => {
  const outlookAccount = req.params['outlookAccount'];
  const roomState = state[outlookAccount];

  res.json(JSON.stringify(roomState));
});

/* Serve client - must be last route */
router.get('*', (req, res) => {
  res.render('application', {
    port: config.clientPort
  });
});

export default router;
