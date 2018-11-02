import { combineReducers } from 'redux';

import navigationReducer from './navigation';
import layoutReducer from './layout';

export default combineReducers({
  navigationReducer,
  layoutReducer
});
