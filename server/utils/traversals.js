import { get } from 'lodash';

/**
 * Parses host parameter.
 * @param {object} req HTTP request object.
 * @returns {string} Host parameter.
 */
export const getHost = (req) => get(req, 'headers.host.slice(0, -5)');

/**
 * Parses origin parameter.
 * @param {object} client WebSocket client object.
 * @returns {string} Origin parameter.
 */
export const getOrigin = (client) => get(client, 'upgradeReq.headers.origin');
