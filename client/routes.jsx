import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import history from './config/history';
import store from './store';

import Body from './components/body';
import LayoutContainer from './components/layout/container';

const Routes = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Body location={history.location}>
        <Route component={LayoutContainer}/>
        <Route path=':location' component={LayoutContainer}/>
      </Body>
    </ConnectedRouter>
  </Provider>
);

export default Routes;
