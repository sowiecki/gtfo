const PRODUCTION_HOST = 'http://ec2-54-175-205-156.compute-1.amazonaws.com:8080';
const DEVELOPMENT_HOST = 'http://localhost:8080';
const HOST = process.env.NODE_ENV === 'production' ? PRODUCTION_HOST : DEVELOPMENT_HOST;

export const ROOM_RESERVATIONS = `${HOST}/rest/meetingRoom/lookup/`; // Append Outlook account
