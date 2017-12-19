/* eslint no-underscore-dangle:0 */
/* globals window */
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import history from '../config/history';
import rootReducer from '../ducks';
import api from '../middleware/api';

const historyMiddleware = routerMiddleware(history);
const baseMiddleware = applyMiddleware(api, historyMiddleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = (initialState = {}) => {
  const composeStore = composeEnhancers(baseMiddleware)(createStore);

  return composeStore(rootReducer, initialState);
};

export default generateStore();
