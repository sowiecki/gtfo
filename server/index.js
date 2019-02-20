/* eslint no-console:0 */
/* globals console */
import http from 'http';
import express from 'express';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import colors from 'colors/safe';

import { SERVER_PORT, PUBLIC_PATH, VIEWS_PATH } from './config';
import routes from './routes';
import socketController from './controllers/socket';
import proxyController from './controllers/proxy';
import devicesController from './controllers/devices';
import stallsController from './controllers/stalls';
import consoleController from './controllers/console';

const app = express();
console.log = consoleController.log;

if (process.env.DEV) {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack/webpack.hot.config');
  const compiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      inline: true,
      logLevel: 'warn'
    })
  );

  if (process.env.HOT) {
    app.use(require('webpack-hot-middleware')(compiler));

    console.log(colors.bgRed('Hot reloading enabled'));
  }
}

/* Remaining Express configuration */
app.use(favicon(`${PUBLIC_PATH}/favicon.ico`));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', SERVER_PORT);
app.set('views', VIEWS_PATH);
app.use('/', express.static(PUBLIC_PATH));
app.use('/', routes);

const server = http.createServer(app);

const run = server.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${SERVER_PORT}`);

  socketController.initialize(server);
  proxyController.initialize();
  consoleController.initialize();
  devicesController.initialize();
  stallsController.initialize();
});

export default run;
