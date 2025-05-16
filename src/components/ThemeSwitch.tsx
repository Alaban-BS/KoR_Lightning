import React from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { Switch, FormControlLabel } from '@mui/material';

const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <FormControlLabel
      control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
      label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
    />
  );
};

export default ThemeSwitch; 