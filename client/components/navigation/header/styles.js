import { css } from 'emotion';

import { colors, fonts, MOBILE_WIDTH_BREAKPOINT } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    > div {
      justify-content: initial;
      background-color: ${colors.primary};
      height: 30px;
      min-height: 48px !important;
      overflow: hidden;
    }
  `,

  title: css`
    margin: 0 20px 0 0;
    color: ${colors.WHITE};
    font-size: 35px;
    font-family: ${fonts.primary};
    font-weight: 8;

    @media (max-width: ${MOBILE_WIDTH_BREAKPOINT}px) {
      min-width: 100px;
      font-size: 30px;
      font-weight: 600;
    }
  `,

  tab: css`
    font-size: 16px;
    min-width: 200px;
    background-color: ${colors.primary};
    span {
      color: ${colors.WHITE};
      font-size: 18px;
    }
  `
});

export default stylesGenerator;
