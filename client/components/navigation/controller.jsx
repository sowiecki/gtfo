import React, { Component } from 'react';
import { Link } from 'react-router';

import { AppBar, LeftNav } from 'material-ui/lib';

import MenuButton from './menu-button';

export default class NavigationController extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
  }

  componentDidMount() {
    // Necessary because LeftNav starts open ¯\_(ツ)_/¯
    this.toggleNav();
  }

  toggleNav() {
    this.refs.leftNav.toggle();
  }

  render() {
    const menuButton = (
      <MenuButton toggleNav={this.toggleNav.bind(this)}/>
    );

    return (
      <div>
        <AppBar
          title="GTFO"
          iconElementLeft={<div/>}
          iconElementRight={menuButton}/>
          <LeftNav ref="leftNav">
            <Link to='/' onClick={this.toggleNav}>Placeholder</Link>
          </LeftNav>
      </div>
    );
  }
}
