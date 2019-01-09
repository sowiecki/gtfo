import Routes from './routes';

const Application = process.env.HOT === true ? require('react-hot-loader').hot(module)(Routes) : Routes;

export default Application;
