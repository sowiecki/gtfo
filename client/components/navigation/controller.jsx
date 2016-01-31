import React from 'react';
import { pure } from 'recompose';
import ImmutablePropTypes from 'immutable-props';
import { Link } from 'react-router';

import { AppBar, LeftNav } from 'material-ui/lib';

import MenuButton from './menu-button';
import LeftNavContent from './left-nav-content';

import styles from './styles';

const NavigationController = ({ actions, navigation }) => {
  const { siteNavOpen } = navigation.toJS();
  const toggleSiteNavOpen = actions.emitSiteNavToggle.bind(null, !siteNavOpen);

  const menuButton = (
    <MenuButton toggleNav={toggleSiteNavOpen}/>
  );

  return (
    <div>
      <AppBar
        title='Office Insight'
        iconElementLeft={<div/>}
        iconElementRight={menuButton}
        titleStyle={styles.appTitle}
        style={styles.appBar}/>
      <LeftNav open={siteNavOpen}>
        <LeftNavContent toggleSiteNavOpen={toggleSiteNavOpen}/>
      </LeftNav>
    </div>
  );
};

NavigationController.propTypes = {
  navigation: ImmutablePropTypes.Map.isRequired
};

export default pure(NavigationController);
