import { css } from 'emotion';

import { colors, fonts, breakpoints } from 'components/common/styles';

const stylesGenerator = () => ({
  placeMarker: css`
    > path {
      color: ${colors.secondary};
      height: 140px;
      transform: scale(0.02) translate(40px, 0);

      ${breakpoints.mobile} {
        transform: scale(0.03) translate(30px, -60px);
      }

      ${breakpoints.mobile_iphone5} {
        transform: scale(0.03) translate(20px, -54px);
      }

      ${breakpoints.large} {
        transform: scale(0.03) translate(20px, -60px);
      }
    }
  `,

  text: css`
    font-size 12px;
    font-weight: bold;
    font-ize: 24px;
    font-family: ${fonts.tertiary};
    fill: ${colors.WHITE};

    ${breakpoints.mobile} {
      transform: translate(0, -18px);

    }

    ${breakpoints.mobile_iphone5} {
      transform: translate(0, -16px);
    }
  `
});

export default stylesGenerator;
