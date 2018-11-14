/* eslint no-underscore-dangle:0 */
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import history from '../config/history';
import createRootReducer from '../ducks';
import api from '../middleware/api';

const store = createStore(
  createRootReducer(history),
  compose(applyMiddleware(routerMiddleware(history), api))
);

export default store;
