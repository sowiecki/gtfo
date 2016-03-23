/* globals window */
import { createStore,
         applyMiddleware,
         combineReducers,
         compose } from 'redux';
import { routerReducer } from 'react-router-redux';

import reducers from '../ducks';
import api from '../middleware/api';

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const isProd = process.env.NODE_ENV === 'production';

const getDebugSessionKey = () => {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return matches && matches.length > 0 ? matches[1] : null;
};

const prodStoreWithMiddleware = compose(
  applyMiddleware(api)
)(createStore);

/**
 * Do not require DevTool-related files in production mode!
 */
const devStoreWithMiddleware = isProd ? null : compose(
  applyMiddleware(api),
  require('../components/dev-tools').instrument(),
  require('redux-devtools').persistState(getDebugSessionKey())
)(createStore);

const configureStore = (initialState) => {
  const composeStore = isProd ? prodStoreWithMiddleware : devStoreWithMiddleware;
  const store = composeStore(rootReducer, initialState);

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
