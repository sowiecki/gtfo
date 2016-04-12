import { isProd } from '../config';

const ENV_PATH = '../environment';

const LOCAL_HOST = 'http://localhost:8080'; // Used when services are running locally, but separately
const MOCKS_HOST = 'http://localhost:3000'; // Used when services are running from this application
const RESERVATIONS_HOST = isProd ? require(ENV_PATH).config.prodReservationsHost : LOCAL_HOST;
const STALLS_HOST = isProd ? require(ENV_PATH).config.prodStallsHost : LOCAL_HOST;

const PROD_RESERVATIONS_API = '/rest/meetingRoom/lookup/';
const PROD_STALLS_API = '/stalls';
export const MOCK_RESERVATIONS_API = '/mocks/meetingRoom/lookup/';
export const MOCK_STALLS_API = '/mocks/stalls';

const MOCK_RESERVATIONS = `${MOCKS_HOST}${MOCK_RESERVATIONS_API}`;
const PROD_RESERVATIONS = `${RESERVATIONS_HOST}${PROD_RESERVATIONS_API}`;
export const RESERVATIONS_URL = process.env.MOCKS ? MOCK_RESERVATIONS : PROD_RESERVATIONS;

const MOCK_STALLS = `${MOCKS_HOST}${MOCK_STALLS_API}`;
const PROD_STALLS = `${STALLS_HOST}${PROD_STALLS_API}`;
export const STALLS_URL = process.env.MOCKS ? MOCK_STALLS : PROD_STALLS;
