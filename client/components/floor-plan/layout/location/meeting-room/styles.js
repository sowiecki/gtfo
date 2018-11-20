import { css } from 'emotion';
import { get } from 'lodash';

import { colors, fonts, breakpoints } from 'components/common/styles';
import { STATUS_COLORS } from 'client/constants';

const stylesGenerator = ({ meetingRoom, ping = {} }) => {
  const pinged = meetingRoom.name.toLowerCase() === get(ping, 'id', '').toLowerCase();
  const animation = pinged ? 'animation: backgroundColor 0.25s infinite alternate;' : '';

  return {
    base: css`
      cursor: pointer;
      fill: ${STATUS_COLORS[meetingRoom.alert]};
      transition: all 250ms ease-in-out;
    `,

    textContainer: css`
      text {
        stroke: none;
        font-family: ${fonts.secondary};
        font-size: ${meetingRoom.coordinates.width < 5 ? 8 : 10}px;
        letter-spacing: 0.2;
        text-transform: capitalize;

        ${breakpoints.mobile} {
          font-size: 6px;
        }

        ${breakpoints.mobile_iphone5} {
          font-size: 4px;
          transform: translate(0, -6px);
        }
      }
    `,

    pinged: css`
      @keyframes backgroundColor {
        from {
          fill: ${STATUS_COLORS.PINGED};
        }
      }

      transition: all 250ms ease-in-out;
      ${animation}

      :hover, :active {
        opacity: 0.4;
        fill: ${colors.LIGHT_GREY};
      }
    `,

    svgRoomTextConnected: colors.DARK_BLUE,

    svgRoomTextDisconnected: colors.DARK_RED
  };
};

export default stylesGenerator;
