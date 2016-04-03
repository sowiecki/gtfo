import moment from 'moment';

import { EMIT_ROOM_MOTION_UPDATE } from '../ducks/rooms';

// TODO fix motionStart not firing

const fetchRoomMotion = (next, action) => {
  const { room, accessories } = action;
  const { motion } = accessories;

  motion.on('motionStart', () => {
    room.lastMotion = moment().toISOString();

    next({
      type: EMIT_ROOM_MOTION_UPDATE,
      room
    });
  });
};

export default fetchRoomMotion;
