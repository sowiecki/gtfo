import { css } from 'emotion';

import { colors, fontStyles, breakpoints } from 'components/common/styles';

const stylesGenerator = ({ displayLegend }) => ({
  base: css`
    opacity: ${displayLegend ? 100 : 0};
    transition: opacity 300ms ease-in;
    position: absolute;
    right: 200px;
    bottom: 0;
    width: 0;

    ${breakpoints.large} {
      right: 300px;
    }

    ${breakpoints.mobile} {
      right: 180px;
      bottom: 0;
    }

    ${breakpoints.mobile_iphone5} {
      right: 150px;
      bottom: -40px;
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

  rect: css`
    transition: all 500ms ease-in-out;
  `,

  closeButton: css`
    position: absolute;
    border-radius: 0;
    top: 0;
    right: 0;
    background-color: ${colors.DARK_GREY};

    > button {
      color: ${colors.WHITE};
    }
  `,

  mapLegend: css`
    padding: 0;
    margin: 0 auto 0 28%;
    width: 290px;
    border: 3px solid ${colors.DARK_GREY};
    transition: all 300ms ease-in;
    transform: scale(0.6) translate(-100px, 100px);

    ${breakpoints.tablet} {
      transform: scale(0.5) translate(-100px, 200px);
    }

    ${breakpoints.mobile} {
      transform: scale(0.4) translate(-100px, 200px);
    }

    ${breakpoints.mobile_iphone5} {
      transform: scale(0.35) translate(-200px, 200px);
    }

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
