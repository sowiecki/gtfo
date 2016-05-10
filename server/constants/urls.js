import { isProd } from '../config';

const { prodReservationsHost,
        prodStallsHost,
        proxyHost } = require('../environment').config;

/**
 * Used when services are running locally, but as separate services.
 */
const LOCAL_HOST = 'http://localhost';

/**
 * Used when services are mocked from this application.
 */
const MOCKS_HOST = `${LOCAL_HOST}:3000`;
const RESERVATIONS_HOST = isProd ? prodReservationsHost : `${LOCAL_HOST}:8080`;
const STALLS_HOST = isProd ? prodStallsHost : MOCKS_HOST;

const PROD_RESERVATIONS_API = '/rest/meetingRoom/lookup/';
const PROD_STALLS_API = '/stalls';
export const MOCK_RESERVATIONS_API = '/mocks/meetingRoom/all';
export const MOCK_STALLS_API = '/mocks/stalls';

const MOCK_RESERVATIONS = `${MOCKS_HOST}${MOCK_RESERVATIONS_API}`;
const PROD_RESERVATIONS = `${RESERVATIONS_HOST}${PROD_RESERVATIONS_API}`;
export const RESERVATIONS_URL = process.env.MOCKS ? MOCK_RESERVATIONS : PROD_RESERVATIONS;

const MOCK_STALLS = `${MOCKS_HOST}${MOCK_STALLS_API}`;
const PROD_STALLS = `${STALLS_HOST}${PROD_STALLS_API}`;
export const STALLS_URL = isProd ? PROD_STALLS : MOCK_STALLS;

export const proxy_HOST = proxyHost;
