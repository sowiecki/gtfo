/* eslint new-cap:0 */
import express from 'express';
import { isEmpty } from 'lodash';

import pingsController from '../controllers/pings';
import devicesController from '../controllers/devices';
import oauthController from '../controllers/oauth';
import genApplicationView from '../views/application';
import { config } from '../../environment';

const router = express.Router();

if (process.env.MOCKS) {
  const mockServices = require('../controllers/mocks').default;

  const respondWithMockedStalls = (res, req) => mockServices.stalls(req, res);
  const respondWithMockedRoom = (res, req) => mockServices.reservationsByRoom(req, res);

  router.get(config.reservations.path, respondWithMockedRoom);
  router.get(config.stalls.path, respondWithMockedStalls);
}

const isAuthorized = (req) => {
  const usesOauth = !isEmpty(config.oauth);

  // TODO check only oauth token, if provided
  if (usesOauth) {
    const headlessAuthorizationMatches = !config.auth.headlessAuthorization
      || config.auth.headlessAuthorization === req.headers.authorization;

    return headlessAuthorizationMatches;
  }

  return true;
};

router.get('/api/reservations', (req, res) => {
  if (isAuthorized(req)) {
    devicesController.getReservations(req, res);
  } else {
    res.status(401).send('Invalid authorization header!');
  }
});

/* Room pings */
router.post('/api/ping', (req, res) => pingsController.handlePingOverHTTP(req, res));

/* AWS Healthcheck */
router.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

/* Serve client - must be last route */
router.get('*', async (req, res) => {
  const responseWithApplicationView = (oauthResponse) =>
    res.send(genApplicationView(oauthResponse));

  if (isEmpty(config.oauth) || !req.query.code) {
    responseWithApplicationView();
  } else if (req.query.code) {
    const oauthResponse = await oauthController.initialize(req);

    responseWithApplicationView(oauthResponse);
  }
});

export default router;
