export const lostConnectionToHost = {
  message: 'Lost connection to server, attempting to reconnect.',
  pending: true
};

export const failedToFetchMeetingRooms = {
  message: 'Error fetching rooms data, please try again later.',
  pending: false
};

export const failedToFetchMarkers = {
  message: 'Error fetching markers data, please try again later.',
  pending: false
};

export const timeTravelPastDate = {
  message: 'Cannot set to past date.',
  timeout: 2000
};
