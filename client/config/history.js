import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from '../store/store';

let history;

/**
 * TODO remove null safety after migrating to PhantomJS tests
 */
if (browserHistory) {
  history = syncHistoryWithStore(browserHistory, store);
}

export default history;
