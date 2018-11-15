import { get } from 'lodash';

const hostPort = -5;

/**
 * Parses host parameter.
 * @param {object} req HTTP request object.
 * @returns {string} Host parameter.
 */
export const getHost = (req) => get(req, 'headers.host').slice(0, hostPort);
