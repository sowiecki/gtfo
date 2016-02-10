import socket from '../socket';

import { NEW_ROOM_PING } from '../constants/events';

const forwardRoomPing = (next, action) => {
  socket.send(NEW_ROOM_PING, action.ping);
};

export default forwardRoomPing;
