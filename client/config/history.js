import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import store from '../store';

const options = {
  selectLocationState: (state) => state.routerReducer
};

const history = syncHistoryWithStore(createBrowserHistory(), store, options);

export default history;
