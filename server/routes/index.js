import express from 'express';

import * as config from '../config';

const router = express.Router();

/* Serve client */
router.get('*', (req, res) => {
  res.render('application', {
    port: config.clientPort
  });
});

export default router;
