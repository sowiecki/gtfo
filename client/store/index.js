/* eslint no-underscore-dangle:0 */
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import history from '../config/history';
import rootReducer from '../ducks';
import api from '../middleware/api';

const store = createStore(
  connectRouter(history)(rootReducer),
  compose(applyMiddleware(routerMiddleware(history), api))
);

export default store;
