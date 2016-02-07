import { createStore,
         applyMiddleware,
         combineReducers,
         compose } from 'redux';
import { syncHistory } from 'react-router-redux';

import reducers from '../ducks';
import history from '../config/history';
import api from '../middleware/api';

const reduxRouterMiddleware = syncHistory(history);
const rootReducer = combineReducers(reducers);

const configureStore = (initialState) => {
  const composeStoreWithMiddleware = compose(
    applyMiddleware(api),
    applyMiddleware(reduxRouterMiddleware)
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

export default configureStore;
