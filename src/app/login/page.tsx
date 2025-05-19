'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError(t('login.error.required'));
      return;
    }
    
    // Set authentication in localStorage
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('username', username);
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
        backgroundColor: 'background.default'
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 4,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: 'background.paper'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t('login.title')}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          id="username"
          label={t('login.username')}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError('');
          }}
          placeholder={t('login.usernamePlaceholder')}
          margin="normal"
          variant="outlined"
          autoFocus
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
        >
          {t('login.submit')}
        </Button>
      </Box>
    </Box>
  );
} 