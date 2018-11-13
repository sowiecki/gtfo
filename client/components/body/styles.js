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

  .blur > * > :not(.dont-blur) {
    filter: blur(2px);
    pointer-events: none;
  }
`;
