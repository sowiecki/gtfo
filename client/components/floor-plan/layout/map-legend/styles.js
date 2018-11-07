import { css } from 'emotion';

import { colors, fontStyles, breakpoints } from 'components/common/styles';

const stylesGenerator = ({ displayLegend }) => ({
  base: css`
    opacity: ${displayLegend ? 100 : 0};
    transition: opacity 300ms ease-in;
    position: absolute;
    right: 200px;
    bottom: 20px;
    width: 0;

    ${breakpoints.large} {
      right: 300px;
    }

    > ul {
      background-color: ${colors.DARK_GREY};
    }

    li {
      padding: 10px;

      > div {
        background-color: ${colors.BLACK};
        margin: 0 10px 0 0;
      }

      ${fontStyles.primary};
      background-color: ${colors.BLACK};
      font-size: 22px;
    }
  `,

  icon: (color) => css`
    color: ${color};
  `,

  closeButton: css`
    position: absolute;
    top: 0;
    right: 0;
    color: ${colors.WHITE};
    background-color: ${colors.DARK_GREY};
  `,

  mapLegend: css`
    padding: 44px 0 0 0;
    margin: 0 auto 0 28%;
    zoom: 0.6;
    width: 280px;
    border: 3px solid ${colors.DARK_GREY};

    > div > div {
      textshadow: 1px 1px 0 ${colors.WHITE};
    }
  `,

  mapLegendIcon: css`
    top: -8px;
    left: 2px;
    transform: scale(0.35);
  `
});

export default stylesGenerator;
