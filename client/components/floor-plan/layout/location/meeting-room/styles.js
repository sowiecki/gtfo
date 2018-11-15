import { css } from 'emotion';
import { get } from 'lodash';

import { colors, fonts, breakpoints } from 'components/common/styles';
import { STATUS_COLORS } from 'client/constants';

const svgLabelBaseTransform = 'rotate(45deg)';

const stylesGenerator = ({ meetingRoom, ping = {} }) => {
  const pinged = meetingRoom.name.toLowerCase() === get(ping, 'id', '').toLowerCase();
  const animation = pinged ? 'animation: backgroundColor 0.25s infinite alternate;' : '';

  return {
    base: css`
      @keyframes backgroundColor {
        from {
          fill: ${STATUS_COLORS.PINGED};
        }
      }

      cursor: pointer;
      fill: ${STATUS_COLORS[meetingRoom.alert]};
      transition: all 500ms ease-in-out;
      ${animation}

      :hover {
        stroke: ${colors.LIGHT_GREY};
      }
    `,

    textContainer: css`
      font-family: ${fonts.quaternary};
      font-weight: 400;
      font-size: 12px;
      text-shadow: ${colors.GREY} 0px 0px 0px;
      text-transform: uppercase;

      text {
        stroke: none;
        transform: ${svgLabelBaseTransform} translate(8px, -20px);

        ${breakpoints.mobile} {
          font-size: 6px;
          transform: ${svgLabelBaseTransform} translate(3px, -20px);
        }
      }
    `,

    svgRect: css`
      strokewidth: 1;
    `,

    svgRoomTextConnected: colors.DARK_BLUE,

    svgRoomTextDisconnected: colors.DARK_RED
  };
};

export default stylesGenerator;
