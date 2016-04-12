import { isProd } from '../config';

const { prodReservationsHost, prodStallsHost } = require('../environment').config;

/**
 * Used when services are running locally, but as separate services.
 */
const LOCAL_HOST = 'http://localhost';

/**
 * Used when services are mocked from this application.
 */
const MOCKS_HOST = 'http://localhost:3000';
const RESERVATIONS_HOST = isProd ? prodReservationsHost : `${LOCAL_HOST}:4000`;
const STALLS_HOST = isProd ? prodStallsHost : `${LOCAL_HOST}:5000`;

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
