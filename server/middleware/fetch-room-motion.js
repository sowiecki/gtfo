import moment from 'moment';

import { EMIT_ROOM_MOTION_UPDATE } from '../ducks/rooms';

const fetchRoomMotion = (next, action) => {
  const { room, accessories } = action;
  const { motion } = accessories;

  motion.on('motionEnd', () => {
    next({
      type: EMIT_ROOM_MOTION_UPDATE,
      room,
      lastMotion: moment()
    });
  });
};

export default fetchRoomMotion;
