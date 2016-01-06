import React from 'react';

import NavigationController from './navigation/controller';

export default ({ children }) => {
  return (
    <span>
      <NavigationController/>
      {children}
    </span>
  );
};
