import { css, Global, ThemeProvider } from '@emotion/react/macro';

const spacingUnit = 0.25;

const theme = {
  typography: {
    fontFamilyBody: 'sans-serif',
    fontFamilyHeading: 'serif',
    baseFontSizePx: '18',
  },
  colour: {
    neutral: {
      light: '#fefefe',
      dark: '#333333',
    },
    primary: '#49656a',
    secondary: '#f1e2b3',
    tertiary: '#cb9256',
  },
  spacing: {
    unit: spacingUnit,
    units: (multiple) => `${multiple * spacingUnit}rem`,
  },
};

function Theme({ children }) {
  return <ThemeProvider theme={theme}>
    <Global styles={css`
      body {
        margin: 0;
        color: ${theme.colour.primary};
        background-color: ${theme.colour.secondary};
        font-family: ${theme.typography.fontFamilyBody};
        font-size: ${theme.typography.baseFontSizePx}px;
      }
    `} />
    {children}
  </ThemeProvider>;
}

export default Theme;
