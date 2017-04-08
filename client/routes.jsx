import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import history from './config/history';
import store from './store';

import Body from './components/body';
import LayoutContainer from './components/layout/container';

const Routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <Body location={history.location}>
        <Route component={LayoutContainer}/>
        <Route path=':location' component={LayoutContainer}/>
      </Body>
    </Router>
  </Provider>
);

export default Routes;
