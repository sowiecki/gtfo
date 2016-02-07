import { routeReducer } from 'react-router-redux';

import navigationReducer from './navigation';
import layoutReducer from './layout';
import markersReducer from './markers';

export default {
  routeReducer,
  navigationReducer,
  layoutReducer,
  markersReducer
};
