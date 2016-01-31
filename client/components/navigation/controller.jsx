import React from 'react';
import radium from 'radium';
import { pure } from 'recompose';
import ImmutablePropTypes from 'immutable-props';

import { AppBar, LeftNav } from 'material-ui/lib';

import MenuButton from './menu-button';
import LeftNavContent from './left-nav-content';

import styles from './styles';

const NavigationController = ({ actions, navigation }) => {
  const { siteNavOpen } = navigation.toJS();
  const toggleSiteNavOpen = actions.emitSiteNavToggle.bind(null, !siteNavOpen);

  return (
    <div>
      <AppBar
        title='Office Insight'
        iconElementLeft={<MenuButton toggleSiteNavOpen={toggleSiteNavOpen}/>}
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

export default pure(radium(NavigationController));
