/* eslint no-underscore-dangle:0 */
/* globals window */
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import history from '../config/history';
import rootReducer from '../ducks';
import api from '../middleware/api';

// const historyMiddleware = routerMiddleware(history);
// const baseMiddleware = applyMiddleware(api, historyMiddleware);
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const generateStore = (initialState = {}) => {
//   const composeStore = composeEnhancers(baseMiddleware)(createStore);

//   return composeStore(rootReducer, initialState);
// };

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
