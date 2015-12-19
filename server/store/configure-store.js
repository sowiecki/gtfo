import { createStore,
         applyMiddleware,
         combineReducers } from 'redux';

import reducers from '../ducks';
import api from '../middleware/api';

const rootReducer = combineReducers(reducers);

const configureStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(api)(createStore);
  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
};

export default configureStore;
