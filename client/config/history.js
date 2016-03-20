import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from '../store/store';

const history = syncHistoryWithStore(browserHistory, store);

export default history;
