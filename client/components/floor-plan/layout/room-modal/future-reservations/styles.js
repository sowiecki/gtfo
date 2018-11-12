/* globals document */
import { css } from 'emotion';
import { isEmpty } from 'lodash';

import { STATUS_COLORS } from 'client/constants';
import { colors, fonts } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    overflow-y: scroll;
    overflow-x: hidden;
    margin: auto;
    width: 500px;
    max-height: ${document.body.clientHeight - 340};
    border: 6px solid ${colors.GREY};
  `,

  title: css`
    font-family: ${fonts.secondary};
    font-size: 30px;
    margin: 0;
    color: ${colors.LIGHT_GREY};
    text-transform: uppercase;
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
    padding: 4px;
    position: absolute;
    right: 0;
  `
});

export default stylesGenerator;
