/* eslint new-cap:0 */
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import pingsController from '../controllers/pings';
import Application from '../views/application';

import { config } from '../environment';
import { BUNDLE_PATH } from '../config';
import { MOCK_RESERVATIONS_API, MOCK_STALLS_API } from '../constants';

const router = express.Router();

if (process.env.MOCKS) {
  const mockServices = require('../controllers/mocks').default;
  const respondWithMockedRoom = (res, req) => mockServices.reservationsByRoom(req, res);
  const respondWithMockedStalls = (res, req) => mockServices.stalls(req, res);

  router.get(`${MOCK_RESERVATIONS_API}:roomId`, respondWithMockedRoom);

  if (config.public.enableStalls) {
    router.get(MOCK_STALLS_API, respondWithMockedStalls);
  }
}

/* Room pings */
router.post('/api/ping', (req, res) => pingsController.handlePing(req, res));

/* Serve client - must be last route */
router.get('*', (req, res) => {
  const applicationView = ReactDOMServer.renderToStaticMarkup(
    <Application bundle={BUNDLE_PATH}/>
  );

  res.send(applicationView);
});

export default router;
