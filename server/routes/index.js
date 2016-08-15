/* eslint new-cap:0 */
import express from 'express';

import pingsController from '../controllers/pings';
import applicationView from '../views/application';

import { config } from '../environment';
import { isProd } from '../config';
import { MOCK_RESERVATIONS_API, MOCK_STALLS_API } from '../constants';

const router = express.Router();

if (config.public.enableStalls && !isProd) {
  const mockServices = require('../controllers/mocks').default;

  const respondWithMockedStalls = (res, req) => mockServices.stalls(req, res);

  router.get(MOCK_STALLS_API, respondWithMockedStalls);

  if (process.env.MOCKS) {
    const respondWithMockedRoom = (res, req) => mockServices.reservationsByRoom(req, res);

    router.get(MOCK_RESERVATIONS_API, respondWithMockedRoom);
  }
}

/* Room pings */
router.post('/api/ping', (req, res) => pingsController.handlePingOverHTTP(req, res));

/* Serve client - must be last route */
router.get('*', (req, res) => res.send(applicationView));

export default router;
