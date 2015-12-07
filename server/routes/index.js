/* eslint new-cap:0 */
import express from 'express';
import * as config from '../config';
import { getContacts } from '../modules/outlook-wrapper';

const router = express.Router();

/* Serve client */
router.get('*', (req, res) => {
  getContacts();
  res.render('application', {
    port: config.clientPort
  });
});

export default router;
