/* eslint no-underscore-dangle:0 */
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import history from '../config/history';
import rootReducer from '../ducks';
import api from '../middleware/api';

const generateStore = (initialState = {}) => createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      api
    )
  )
);

export default generateStore();
