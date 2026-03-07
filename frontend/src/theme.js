import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    custom: {
      baseWhite: 'rgba(255,255,255,0.95)',
    },
    // T030: darkened secondary from #9c27b0 (~3.56:1) to #7B1FA2 (~5.12:1) against white
    secondary: {
      main: '#7B1FA2',
    },
  },
});

export default theme;
