const PRODUCTION_HOST = 'http://localhost:8080'; // TODO get from hidden env variable
const DEVELOPMENT_HOST = 'http://localhost:8080';
const HOST = process.env.NODE_ENV === 'production' ? PRODUCTION_HOST : DEVELOPMENT_HOST;

export const ROOM_RESERVATIONS = `${HOST}/rest/meetingRoom/lookup/`; // Append Outlook account
