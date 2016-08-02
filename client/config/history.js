import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from '../store';

const options = {
  selectLocationState: (state) => state.routerReducer
};

const history = syncHistoryWithStore(browserHistory, store, options);

export default history;
