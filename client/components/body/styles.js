import { injectGlobal } from 'emotion';

import { colors } from 'components/common/styles/base';

injectGlobal`
  html, body, #root, #root > div, #modal {
    position: absolute;
    margin: 0;
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    background-color: ${colors.GHOST_WHITE}
  }

  #modal {
    position: absolute;
    background: none;
    pointer-events: none;
  }

  * {
    box-sizing: border-box;
  }

  .root-container-enter: {
    position: absolute;
    opacity: 0.01;
  },

  .root-container-enter.root-container-enter-active: {
    opacity: 1;
    transition: opacity 100ms ease-in;
  },

  .root-container-leave: {
    position: absolute;
    opacity: 1;
  },

  .root-container-leave.root-container-leave-active: {
    position: absolute;
    opacity: 0.01;
    transition: opacity 200ms ease-in;
  }
`;
