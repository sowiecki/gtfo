/* eslint no-magic-numbers:0 */
import get from 'lodash/object/get';

export const getHost = (req) => get(req, 'headers.host.slice(0, -5)');

export const getOrigin = (client) => get(client, 'upgradeReq.headers.origin');
