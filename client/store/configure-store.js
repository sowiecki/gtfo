import { createStore,
         applyMiddleware,
         combineReducers } from 'redux';

import reducers from '../ducks';
import api from '../middleware/api';

const rootReducer = combineReducers(reducers);

const configureStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(api)(createStore);
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../ducks', () => {
      const nextRootReducer = require('../ducks');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
