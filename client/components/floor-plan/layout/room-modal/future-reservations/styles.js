/* globals document */
import { css } from 'emotion';
import { isEmpty } from 'lodash';

import { STATUS_COLORS } from 'client/constants';
import { colors, fonts, breakpoints } from 'components/common/styles';

const stylesGenerator = () => ({
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
    const STATUS_COLOR = !isEmpty(value.reservation) ? STATUS_COLORS.BOOKED : STATUS_COLORS.VACANT;
    const background = value.isCurrentTime ? '' : 'opacity: 0.55;';

    return css`
      position: relative;
      margin: 0;
      padding: 4px;
      text-align: left;
      display: inline-block;
      font-family: ${fonts.tertiary};
      font-size: 18px;
      background-color: ${STATUS_COLOR};
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
