import Routes from './routes';

const Application = process.env.HOT === true ? Routes : require('react-hot-loader').hot(module)(Routes);

export default Application;
