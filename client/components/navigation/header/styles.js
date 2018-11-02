import { css } from 'emotion';

import { colors, fonts } from '../../common/styles';

const stylesGenerator = () => ({
  base: css`
    justify-content: initial;
    background-color: ${colors.primary};
    height: 48px;
    overflow: hidden;
  `,

  title: css`
    margin: 0 20px 0 0;
    color: ${colors.WHITE};
    font-size: 35px;
    line-height: 48px;
    font-family: ${fonts.primary};
    font-weight: 8;
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
