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
  }

  .map-legend-item-enter {
    opacity: 0.01;
    transform: scaleY(0);
  }

  .map-legend-item-enter.map-legend-item-enter-active {
    opacity: 1;
    transform: scaleY(1);
    transition: all 350ms ease-in;
  }

  .map-legend-item-leave {
    opacity: 1;
    transform: scaleY(1);
  }

  .map-legend-item-leave.map-legend-item-leave-active {
    opacity: 0.01;
    transition: all 250ms ease-in;
  }

  .generic-enter {
    opacity: 0.01;
  }

  .generic-enter.generic-enter-active {
    opacity: 1;
    transition: all 350ms ease-in;
  }

  .generic-leave {
    opacity: 1;
  }

  .generic-leave.generic-leave-active {
    opacity: 0.01;
    transition: all 250ms ease-in;
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

  .header-enter {
    opacity: 0.01;
    height: 0;
  }

  .header-enter.header-enter-active {
    opacity: 1;
    height: 30px;
    transition: all 350ms ease-in;
  }

  .header-leave {
    opacity: 1;
    height: 30px;
  }

  .header-leave.header-leave-active {
    opacity: 0.01;
    height: 0;
    transition: all 250ms ease-in;
  }
`;
