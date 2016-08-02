/* globals window */
import { get } from 'lodash';
import { applyMiddleware, compose, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../ducks';
import api from '../middleware/api';

const MATCH_REGEX = /[?&]debug_session=([^&#]+)\b/;
const getDebugSessionKey = () => get(window.location.href.match(MATCH_REGEX), '[1]', null);
const isProd = process.env.NODE_ENV === 'production';

const baseMiddleware = applyMiddleware(api, routerMiddleware(history));
const getMiddlewares = () => [
  baseMiddleware,

  // Do not bundle Dev-Tool middleware in prod
  isProd ? null : require('components/dev-tools').default.instrument(),
  isProd ? null : require('redux-devtools').persistState(getDebugSessionKey())
].filter((middleware) => middleware !== null);

const generateStore = (history, initialState = {}) => {
  const composeStore = compose(...getMiddlewares())(createStore);

  return composeStore(rootReducer, initialState);
};

export default generateStore(browserHistory);
