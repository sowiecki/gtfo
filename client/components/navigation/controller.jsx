import React from 'react';
import { pure } from 'recompose';
import ImmutablePropTypes from 'immutable-props';
import { Link } from 'react-router';

import { AppBar, LeftNav } from 'material-ui/lib';

import MenuButton from './menu-button';

const NavigationController = ({ actions, navigation }) => {
  const { siteNavOpen } = navigation.toJS();

  const menuButton = (
    <MenuButton toggleNav={actions.emitSiteNavToggle.bind(null, !siteNavOpen)}/>
  );

  return (
    <div>
      <AppBar
        title="GTFO"
        iconElementLeft={<div/>}
        iconElementRight={menuButton}/>
        <LeftNav open={siteNavOpen}>
          <Link to='/' onClick={actions.emitSiteNavToggle.bind(null, !siteNavOpen)}>
            Placeholder
          </Link>
        </LeftNav>
    </div>
  );
};

NavigationController.propTypes = {
  navigation: ImmutablePropTypes.Map.isRequired
};

export default pure(NavigationController);
