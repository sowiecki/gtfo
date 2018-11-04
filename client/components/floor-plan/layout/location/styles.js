import { css } from 'emotion';

import { breakpoints } from 'components/common/styles';
import { genWidthAndHeight } from 'utils';

const generateLayoutSVGWidthAndHeight = (width) => `
  ${genWidthAndHeight(width)};

  > svg {
    ${genWidthAndHeight(width)};
  }

  > img {
    ${genWidthAndHeight(width)};
  }
`;

const stylesGenerator = () => ({
  base: css`
    display: block;
    overflow: hidden;
    right: 0;
    left: 0;
    margin: auto auto;

    text.anchor-marker {
      opacity: 0.5;
    }

    > svg {
      position: absolute;
      top: 4px;
    }

    > img {
      top: 4px;
      display: block;
      overflow: hidden;
      position: absolute;
      height: 100%;
    }

    ${generateLayoutSVGWidthAndHeight(608)};

    ${breakpoints.mobile_iphone5} {
      ${generateLayoutSVGWidthAndHeight(200)};
    }

    ${breakpoints.mobile} {
      ${generateLayoutSVGWidthAndHeight(370)};
    }

    ${breakpoints.tablet} {
      ${generateLayoutSVGWidthAndHeight(740)};
    }
  `
});

export default stylesGenerator;
