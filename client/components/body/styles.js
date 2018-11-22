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
    background-color: ${colors.GHOST_WHITE};
  }

  #modal {
    position: absolute;
    background: none;
    pointer-events: none;
  }

  * {
    box-sizing: border-box;
  }

  .blur > * > :not(.dont-blur) {
    filter: blur(2px);
    pointer-events: none;
  }

  .modal-enter {
    opacity: 0.01;
    transform: translateY(100%);
  }

  .modal-enter.modal-enter-active {
    opacity: 1;
    transition: all 350ms ease-in;
    transform: translateY(0%);
  }

  .modal-leave {
    opacity: 1;
    transform: translateY(0%);
  }

  .modal-leave.modal-leave-active {
    opacity: 0.01;
    transition: all 250ms ease-in;
    transform: translateY(100%);
  }

  .map-legend-enter {
    opacity: 0.01;
  }

  .map-legend-enter.map-legend-enter-active {
    opacity: 1;
    transition: all 350ms ease-in;
  }

  .map-legend-leave {
    opacity: 1;
  }

  .map-legend-leave.map-legend-leave-active {
    opacity: 0.01;
    transition: all 250ms ease-in;
  }
`;
