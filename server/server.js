/* eslint no-console:0 */
/* globals console __dirname */
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import colors from 'colors/safe';

import { SERVER_PORT, PUBLIC_PATH } from './config';
import routes from './routes';
import devicesController from './controllers/devices';

const server = express();

/* Client hot reloading (dev only) */
if (process.env.HOT) {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.hot');
  const compiler = webpack(webpackConfig);

  server.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  server.use(require('webpack-hot-middleware')(compiler));

  console.log(colors.bgRed('Hot reloading enabled'));
}

/* Setup */
server.use(favicon(`server/${PUBLIC_PATH}/favicon.ico`));
server.use(logger('dev'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.set('port', SERVER_PORT);
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.use('/', express.static(path.join(__dirname, PUBLIC_PATH)));
server.use('/', routes);

const app = server.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${SERVER_PORT}`);

  if (!process.env.DISABLE_DEVICES) {
    devicesController.initRooms();
  }
});

if (process.env.MOCKS) {
  console.log(colors.gray.italic('Using mock data'));
}

export default app;
