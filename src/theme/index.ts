import { createTheme, ThemeOptions } from '@mui/material/styles';

// Common theme options shared between light and dark themes
const commonThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: ['Inter', 'Scale', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
};

// Light theme configuration
export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#24005E',
      light: '#3D1B8E',
      dark: '#1A0040',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7B669E',
      light: '#9B8AB8',
      dark: '#5B4A7E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },
    warning: {
      main: '#ED6C02',
      light: '#FF9800',
      dark: '#E65100',
    },
    info: {
      main: '#0288D1',
      light: '#03A9F4',
      dark: '#01579B',
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
    },
  },
});

// Dark theme configuration
export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#9B8AB8',
      light: '#B8A8D8',
      dark: '#7B669E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#3D1B8E',
      light: '#5B4A7E',
      dark: '#24005E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    error: {
      main: '#FF8A80',
      light: '#FFB4AB',
      dark: '#EF5350',
    },
    warning: {
      main: '#FFB74D',
      light: '#FFD180',
      dark: '#FF9800',
    },
    info: {
      main: '#4FC3F7',
      light: '#81D4FA',
      dark: '#03A9F4',
    },
    success: {
      main: '#81C784',
      light: '#A5D6A7',
      dark: '#4CAF50',
    },
  },
});

// Theme type for TypeScript
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
} 