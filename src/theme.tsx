import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: { main: '#556cd6' },
    secondary: { main: '#19857b' },
    error: { main: red.A400 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Inter regular", sans-serif',
          margin: 0,
          fontSize: '1rem',
          backgroundColor: '#171717',
        },
      },
    },
  },
});

export default theme;
