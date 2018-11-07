import { css } from 'emotion';

import { colors, breakpoints } from 'components/common/styles';
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
    background-color: ${colors.BLACK};

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

    ${breakpoints.mobile} {
      ${generateLayoutSVGWidthAndHeight(400)};
    }

    ${breakpoints.mobile_iphone5} {
      ${generateLayoutSVGWidthAndHeight(300)};
    }

    ${breakpoints.tablet} {
      ${generateLayoutSVGWidthAndHeight(740)};
    }

    ${breakpoints.large} {
      ${generateLayoutSVGWidthAndHeight(870)};
    }
  `
});

export default stylesGenerator;
