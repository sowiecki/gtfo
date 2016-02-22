/* eslint new-cap:0 */
import express from 'express';

import pingsController from '../controllers/pings';
// import markersController from '../controllers/markers';

const router = express.Router();

/* Room pings */ // TODO change to use payload
router.post('/api/ping', (req, res) => pingsController.handlePing(req, res));

/* Map markers */
router.post('/api/mark/:TODO', () => {
  // res.json(markers); // TODO
});

router.post('/api/mark/:TODO', () => {
  // res.json(markers); // TODO
});

/* Serve client - must be last route */
router.get('*', (req, res) => {
  res.render('application');
});

export default router;
