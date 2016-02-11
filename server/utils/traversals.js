/* eslint no-magic-numbers:0 */

export const getHost = (req) => req.headers.host.slice(0, -5);

export const getOrigin = (client) => client.upgradeReq.headers.origin;
