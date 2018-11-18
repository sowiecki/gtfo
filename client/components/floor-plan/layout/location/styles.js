import { css } from 'emotion';

import { colors, breakpoints } from 'components/common/styles';

const generateLayoutSVGWidthAndHeight = (n) => `
height: ${n};
width: ${n};

> img,
> svg {
  height: ${n};
  width: ${n};
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

    ${generateLayoutSVGWidthAndHeight(708)}

    ${breakpoints.mobile} {
      ${generateLayoutSVGWidthAndHeight(400)}
    }
  `
});

export default stylesGenerator;
