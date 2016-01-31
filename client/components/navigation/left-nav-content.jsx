import React, { PropTypes } from 'react';
import { pure } from 'recompose';
import { Link } from 'react-router';


const LeftNavContent = ({ toggleSiteNavOpen }) => (
  <div>
    TODO
    <Link to='/' onClick={toggleSiteNavOpen}>
      Close
    </Link>
  </div>
);

LeftNavContent.propTypes = {
  toggleSiteNavOpen: PropTypes.func.isRequired
};

export default pure(LeftNavContent);
