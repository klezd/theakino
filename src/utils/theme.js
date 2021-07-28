import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5d4037',
      dark: '#321911',
      light: '#8b6b61',
      contrastText: '#fafafa'
    },
    secondary: {
      main: '#d7ccc8',
      dark: '#a69b97',
      light: '#fffffb',
      contrastText: '#3e2723'
    },
    white: {
      main: '#fff',
      contrastText: '#000'
    }
  }
});

export default theme;
