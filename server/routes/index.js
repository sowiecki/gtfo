/* eslint new-cap:0 */
import express from 'express';
import * as config from '../config';
// import { getContacts } from '../modules/outlook-wrapper';
import state from '../state';

const router = express.Router();

/* Show room status */
router.get('/api/rooms/:outlookAccount', (req, res) => {
  const outlookAccount = req.params['outlookAccount'];
  const roomState = state[outlookAccount];

  const mockRoomState = {
    upcomingMeetings: [
      {
        "email":"Jenna Currie ",
        "startDate":"Thu Dec 10 10:00:00 CST 2015",
        "endDate":"Thu Dec 10 11:00:00 CST 2015"
      },
      {
        "email":"Corbin Martinez ",
        "startDate":"Thu Dec 10 11:00:00 CST 2015",
        "endDate":"Thu Dec 10 11:30:00 CST 2015"
      }
    ]
  };

  res.json(mockRoomState);
});

/* Serve client - must be last route */
router.get('*', (req, res) => {
  res.render('application', {
    port: config.clientPort
  });
});

export default router;
