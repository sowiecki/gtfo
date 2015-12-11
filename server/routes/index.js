/* eslint new-cap:0 */
import express from 'express';
import * as config from '../config';
// import { getContacts } from '../modules/outlook-wrapper';

const router = express.Router();

/* Serve client */
router.get('*', (req, res) => {
  res.render('application', {
    port: config.clientPort
  });
});

/* Show room status */
router.get('/api/rooms/:outlookAccount', (req, res) => {
  res.reply('WIP');
});

export default router;
