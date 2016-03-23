/* globals window */
import { createStore,
         applyMiddleware,
         combineReducers,
         compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import { persistState } from 'redux-devtools';

import DevTools from '../components/dev-tools';

import reducers from '../ducks';
import api from '../middleware/api';

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const getDebugSessionKey = () => {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
};

const configureStore = (initialState) => {
  const composeStoreWithMiddleware = compose(
    applyMiddleware(api),
    DevTools.instrument(),
    persistState(getDebugSessionKey())
  )(createStore);
  const store = composeStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../ducks', () => {
      const nextRootReducer = require('../ducks/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

const store = configureStore();
export default store;
