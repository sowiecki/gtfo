/* eslint new-cap:0 */
import express from 'express';

import * as config from '../config';

var wrapper = require("../modules/outlook-wrapper");

const router = express.Router();

/* Serve client */
router.get('*', (req, res) => {
	wrapper.getContacts();
  res.render('application', {
    port: config.clientPort
  });
});

export default router;