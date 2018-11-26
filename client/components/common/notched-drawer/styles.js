import { css } from 'emotion';

import { colors } from 'components/common/styles';

const stylesGenerator = ({ isOpen }) => ({
  base: css`
    position: absolute;
    height: 122px;
    width: 100%;
    text-align: center;
    bottom: ${isOpen ? 0 : -92};
    transition: all 250ms ease-in-out;
  `,

  notchButton: css`
    cursor: pointer;
    outline: none;
    padding: 0;
    border: none;
    height: 30px;
    width: 100px;
    border-radius: 0;
    background-color: ${colors.DARK_GREY};
    transition: all 250ms ease-in-out;

    :hover,
    :active {
      background-color: ${colors.GREY};
    }

    > span {
      font-size: 36px;
      color: ${colors.LIGHT_GREY};
      transition: all 500ms ease-in-out;
      transform: ${isOpen ? 'rotate(180deg)' : ''};
    }
  `,

  children: css`
    height: 92px;
    padding: 6px 0;
    background-color: ${colors.DARK_GREY};
  `
});

export default stylesGenerator;
