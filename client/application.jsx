import Routes from './routes';

/*
 * Production systems may not have react-hot-loader dependency installed,
 * so avoid requiring unless running in dev mode.
 */
const Application = process.env.NODE_ENV === 'production' ? Routes : require('react-hot-loader').hot(module)(Routes);

export default Application;
