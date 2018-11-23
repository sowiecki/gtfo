/* globals document */
import { css } from 'emotion';
import { isEmpty } from 'lodash';
import Color from 'color';

import { colors, fonts, breakpoints, STATUS_COLOR_THEMES } from 'components/common/styles';

const stylesGenerator = ({ isOnline, statusesTheme }) => ({
  base: css`
    overflow-y: scroll;
    overflow-x: hidden;
    margin: auto;
    max-width: 500px;
    max-height: ${document.body.clientHeight - 320};
    border: 1px solid ${colors.GREY};
  `,

  scrollIcon: css`
    cursor: pointer;
    color: ${colors.GREY};
    transition: all 120ms ease-in-out;

    :hover {
      color: ${colors.LIGHT_GREY};
    }
  `,

  status: (value) => {
    const STATUS_COLOR = !isEmpty(value.reservation)
      ? STATUS_COLOR_THEMES[statusesTheme].BOOKED
      : STATUS_COLOR_THEMES[statusesTheme].VACANT;
    const background = value.isCurrentTime ? '' : 'opacity: 0.55;';
    const statusColorLum = Color(STATUS_COLOR).luminosity();

    return css`
      position: relative;
      margin: 0;
      padding: 4px;
      text-align: left;
      display: inline-block;
      font-family: ${fonts.tertiary};
      font-size: 14px;
      color: ${statusColorLum < 0.5 ? colors.WHITE : colors.DARK_GREY};
      background-color: ${isOnline ? STATUS_COLOR : STATUS_COLOR_THEMES[statusesTheme].OFFLINE};
      border: 1px solid ${colors.GREY};
      width: 100%;
      height: ${34 * value.increments}px;
      ${background}
    `;
  },

  right: css`
    position: absolute;
    padding: 4px;
    top: 0;
    right: 0;

    ${breakpoints.mobile} {
      font-size: 12px;
    }
  `
});

export default stylesGenerator;
