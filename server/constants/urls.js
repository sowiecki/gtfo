import { isProd } from '../config';

const ENV_PATH = '../environment';

const HOST = isProd ? require(ENV_PATH).config.productionHost : 'http://localhost:8080';
const MOCKS_HOST = 'http://localhost:3000';
const PROD_RESERVATIONS_API = '/rest/meetingRoom/lookup/';
export const MOCK_RESERVATIONS_API = '/mocks/smeetingRoom/lookup/';

const MOCK_RESERVATIONS = `${MOCKS_HOST}${MOCK_RESERVATIONS_API}`;
const PROD_RESERVATIONS = `${HOST}${PROD_RESERVATIONS_API}`;
export const RESERVATIONS_URL = process.env.MOCKS ? MOCK_RESERVATIONS : PROD_RESERVATIONS;
