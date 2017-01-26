import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../ducks';
import api from '../middleware/api';

const configureStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(api)(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
};

const store = configureStore();
export default store;
