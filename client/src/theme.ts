import { css, space, ThemeConfig } from 'bumbag'

const theme: ThemeConfig = {
  global: {
    fontSize: 13,
    styles: {
      base: css`
        html,
        body {
          background-color: #ebecef;
        }
        button::focus {
          outline: none !important;
        }
      `,
    },
  },
  breakpoints: {
    mobile: 520,
    tablet: 960,
  },
  fonts: {
    default: 'Open Sans, sans-serif',
  },
  fontWeights: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 600,
    bolder: 700,
    extraBold: 900,
  },
  palette: {
    text: '#172C49',
    white: '#FFF',
    greyLight: '#F4F4F4',
    grey: '#EBECEF',
    greyDark: '#535A72',
    greyDarker: '#454F63',
    yellow: '#E9CF30',
    yellowLight: '#fbf5d6',
    green: '#3BA935',
    red: '#D92323',
    red100: '#5e1914',
  },
  borderRadii: {
    default: '6px',
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '50%',
  },
  borders: {
    primary: {
      color: '#454F63',
      width: '2px',
    },
    thick: {
      color: '#3BA935',
      width: '4px',
    },
    thickGreen: {
      color: '#3BA935',
      width: '2px',
    },
    thickGrey: {
      color: '#DFDEE2',
      width: '2px',
    },
    thin: {
      color: '#E9CF30',
      width: '8px',
    },
    baseLine: {
      color: '#8997B2',
      width: '2px',
    },
  },
  lineHeights: {
    xs: 1.13,
    sm: 1.34,
    l: 1.38,
  },
  altitudes: {
    100: 'box-shadow: 0px 2px 6px #0000000F',
    200: 'box-shadow: 0px 3px 6px #00000014',
    300: 'box-shadow: 0px 3px 6px #00000029',
  },
  spacing: {
    xs /* 4 */: space(1, 'minor'),
    sm /* 8 */: space(2, 'minor'),
    md /* 12 */: space(3, 'minor'),
    lg /* 16 */: space(4, 'minor'),
    xl /* 20 */: space(5, 'minor'),
    '2xl' /* 24 */: space(6, 'minor'),
    '3xl' /* 28 */: space(7, 'minor'),
    '4xl' /* 32 */: space(8, 'minor'),
    '5xl' /* 36 */: space(9, 'minor'),
    '6xl' /* 40 */: space(10, 'minor'),
    '7xl' /* 44 */: space(11, 'minor'),
    '8xl' /* 48 */: space(12, 'minor'),
    xxl /* 96 */: space(24, 'minor'),
  },
  Input: {
    styles: {
      focus: {
        borderColor: '#3BA935',
      },
    },
  },
}

export default theme
