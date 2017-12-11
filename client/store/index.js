/* eslint no-underscore-dangle:0 */
/* globals window */
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import history from '../config/history';
import rootReducer from '../ducks';
import api from '../middleware/api';

const historyMiddleware = routerMiddleware(history);

const baseMiddleware = applyMiddleware(api, historyMiddleware);
const getMiddlewares = () => [
  baseMiddleware,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
].filter((middleware) => middleware !== null);

const generateStore = (initialState = {}) => {
  const composeStore = compose(...getMiddlewares())(createStore);

  return composeStore(rootReducer, initialState);
};

export default generateStore();
