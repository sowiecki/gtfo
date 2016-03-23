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

const configureStore = (initialState) => {
  const composeStoreWithMiddleware = compose(
    applyMiddleware(api)
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
