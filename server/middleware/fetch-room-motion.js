import { EMIT_ROOM_MOTION_UPDATE } from '../ducks/rooms';

const fetchRoomMotion = (room, next, action) => {
  const { motion } = action.accessories;

  motion.on('motionStart', () => {
    next({
      type: EMIT_ROOM_MOTION_UPDATE,
      room,
      motion: true
    });
  });

  motion.on('motionEnd', () => {
    next({
      type: EMIT_ROOM_MOTION_UPDATE,
      room,
      motion: false
    });
  });
};

export default fetchRoomMotion;
