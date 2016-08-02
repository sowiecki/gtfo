import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import navigationReducer from './navigation';
import layoutReducer from './layout';

export default combineReducers({
  navigationReducer,
  layoutReducer,
  routerReducer
});
