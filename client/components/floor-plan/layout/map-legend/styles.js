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
    border-radius: 0;
    top: 0;
    right: 0;
    color: ${colors.WHITE};
    background-color: ${colors.DARK_GREY};
  `,

  mapLegend: css`
    padding: 0;
    margin: 0 auto 0 28%;
    zoom: 0.6;
    width: 280px;
    border: 3px solid ${colors.DARK_GREY};

    > div > div {
      textshadow: 1px 1px 0 ${colors.WHITE};
    }

    .map-legend-handle {
      position: relative;
      cursor: move;
      width: 100%;
      height: 45px;

      // thanks https://codepen.io/zachariab/pen/wkrbc
      span.grippy {
        content: '....';
        width: 40px;
        height: 45px;
        display: inline-block;
        overflow: hidden;
        line-height: 9px;
        vertical-align: middle;
        margin: -6px 0 0 2px;
        font-size: 30px;
        font-family: sans-serif;
        letter-spacing: 2px;
        color: ${colors.LIGHT_GREY};
      }

      span.grippy::after {
        content: '.. .. .. ..';
      }
    }
  `,

  mapLegendIcon: css`
    top: -8px;
    left: 2px;
    transform: scale(0.35);
  `
});

export default stylesGenerator;
