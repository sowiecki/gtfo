import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import history from './config/history';
import store from './store';

import Body from './components/body';
// import LayoutRoomContainer from './components/room-location/container';
import LayoutLocationContainer from './components/layout-location/container';

const Routes = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Body location={history.location}>
        <Route component={LayoutLocationContainer}/>
        {/* <Route path=':location/:room' component={LayoutRoomContainer}/> */}
        <Route path=':location' component={LayoutLocationContainer}/>
      </Body>
    </ConnectedRouter>
  </Provider>
);

export default Routes;
