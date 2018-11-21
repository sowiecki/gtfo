import { css } from 'emotion';

// import { ONE_MINUTE_WARNING, FIVE_MINUTE_WARNING, STATUS_COLORS } from 'client/constants';
// import { colors, fonts, breakpoints } from 'components/common/styles';

const stylesGenerator = () => ({
  base: css`
    right: 0;
    left: 0;
    margin: auto;
    position: absolute;
    width: 500px;
    height: 500px;
    background: red;
    pointer-events: all;
  `
});

export default stylesGenerator;
