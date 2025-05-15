'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 4,
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          {t('navigation.dashboard')}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Welcome to the Order Management System
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/orders')}
          >
            {t('navigation.orders')}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.push('/products')}
          >
            {t('navigation.products')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 