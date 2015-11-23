/* eslint no-console:0 */
/* globals console */
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import colors from 'colors/safe';

import * as config from './config';
import routes from './routes';

const server = express();

/* Configuration */
server.use(favicon(`server/${config.publicPath}/favicon.ico`));
server.use(logger('dev'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.set('port', config.serverPort);
server.use('/', routes);
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.use(express.static(path.join(__dirname, `${config.publicPath}`)));

/* Database */
const connect = () => {
  mongoose.connect(config.dbURI, config.dbOptions);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

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

export default server;
