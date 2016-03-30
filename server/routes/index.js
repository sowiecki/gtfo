/* eslint new-cap:0 */
import express from 'express';

import pingsController from '../controllers/pings';

import { MOCK_RESERVATIONS_API } from '../constants';

const router = express.Router();

if (process.env.MOCKS) {
  const mockServices = require('../controllers/mocks').default;
  const respondWithMockedRoom = (res, req) => mockServices.reservationsByRoom(req, res);

  router.get(`${MOCK_RESERVATIONS_API}:roomId`, respondWithMockedRoom);
}

/* Room pings */ // TODO change to use payload
router.post('/api/ping', (req, res) => pingsController.handlePing(req, res));

/* Serve client - must be last route */
router.get('*', (req, res) => {
  res.render('application');
});

export default router;
