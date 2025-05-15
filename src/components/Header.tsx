import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme as useMuiTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import { ThemeSwitch } from './ThemeSwitch';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const theme = useMuiTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    navigate('/login');
  };

  return (
    <AppBar 
      position="static" 
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          {t('page.title', { defaultValue: 'Lightning-fast ordering' })}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ThemeSwitch />
          <Tooltip title={t('logout.button', { defaultValue: 'Logout' })}>
            <IconButton 
              onClick={handleLogout}
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 