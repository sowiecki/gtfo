/* eslint no-console:0 */
/* globals console */
import express from 'express';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import colors from 'colors/safe';

import { SERVER_PORT, PUBLIC_PATH, VIEWS_PATH } from './config';
import routes from './routes';
import proxyController from './controllers/proxy';
import devicesController from './controllers/devices';
import stallsController from './controllers/stalls';
import consoleController from './controllers/console';

const server = express();

/* Client hot reloading (dev only) */
if (process.env.HOT) {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack/webpack.hot.config');
  const compiler = webpack(webpackConfig);

  server.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      inline: true
    })
  );

  server.use(require('webpack-hot-middleware')(compiler));

  console.log(colors.bgRed('Hot reloading enabled'));
}

/* Remaining Express configuration */
server.use(favicon(`${PUBLIC_PATH}/favicon.ico`));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.set('port', SERVER_PORT);
server.set('views', VIEWS_PATH);
server.use('/', express.static(PUBLIC_PATH));
server.use('/', routes);

const app = server.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${SERVER_PORT}`);

  proxyController.initialize();
  consoleController.initialize();
  devicesController.initialize();
  stallsController.initialize();
});

export default app;
