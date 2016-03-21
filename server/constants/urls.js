const ENV_PATH = '../environment';
const DEVELOPMENT_HOST = 'http://localhost:8080';
const isProd = process.env.NODE_ENV === 'production';
const HOST = isProd ? require(ENV_PATH).config.productionHost : DEVELOPMENT_HOST;

export const ROOM_RESERVATIONS = `${HOST}/rest/meetingRoom/lookup/`; // Append Outlook account
