import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import api from '../middleware/api';

const configureStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(api)(createStore);
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
