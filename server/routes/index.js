/* eslint new-cap:0 */
import express from 'express';

import pingsController from '../controllers/pings';
import devicesController from '../controllers/devices';
import applicationView from '../views/application';

import { config } from '../../environment';

const router = express.Router();

if (process.env.MOCKS) {
  const mockServices = require('../controllers/mocks').default;

  const respondWithMockedStalls = (res, req) => mockServices.stalls(req, res);
  const respondWithMockedRoom = (res, req) => mockServices.reservationsByRoom(req, res);

  router.get(config.reservations.path, respondWithMockedRoom);
  router.get(config.stalls.path, respondWithMockedStalls);
}

router.get('/api/reservations', (req, res) => devicesController.getReservations(req, res));

/* Room pings */
router.post('/api/ping', (req, res) => pingsController.handlePingOverHTTP(req, res));

/* Serve client - must be last route */
router.get('*', (req, res) => res.send(applicationView));

export default router;
