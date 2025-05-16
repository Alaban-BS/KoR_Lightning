import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { Header } from './components/Header';
import PriceList from './components/PriceList';
import Order from './components/Order';
import OrderManagement from './components/OrderManagement';
import Login from './components/Login';
import { useTranslation } from 'react-i18next';
import { useOrderManagement } from './hooks/useOrderManagement';

/**
 * KOR Order Management Layout
 * A specialized layout for the King of Reach order management system
 * featuring a four-section vertical split:
 * - Header (5%)
 * - Price List (50% of main content)
 * - Order List (40% of main content)
 * - Order Button (5%)
 */
const MainContent: React.FC = () => {
  const { t } = useTranslation();
  const {
    orderLines,
    currentOrderId,
    productData,
    setOrderLines,
    handleRemoveLine,
    handleLoadOrder,
    handleNewOrder,
    handleSubmitOrder
  } = useOrderManagement();

  return (
    <Box 
      sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      className="kor-order-management-layout"
    >
      {/* KOR Layout: Header Section (5%) */}
      <Box sx={{ height: '5%', minHeight: '48px' }}>
        <Header />
      </Box>

      {/* KOR Layout: Main Content Area (90%) */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '90%',
        overflow: 'hidden'
      }}>
        {/* KOR Layout: Price List Section (50% of main content) */}
        <Box sx={{ 
          height: '50%',
          overflow: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
          mb: 2
        }}>
          <PriceList
            productData={productData}
            orderLines={orderLines}
            setOrderLines={setOrderLines}
            flagMapping={{}}
            stockData={[]}
          />
        </Box>

        {/* KOR Layout: Order List Section (40% of main content) */}
        <Box sx={{ 
          height: '40%',
          overflow: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2
        }}>
          <Order
            orderLines={orderLines}
            productData={productData}
            onRemoveLine={handleRemoveLine}
            orderManagement={
              <OrderManagement
                currentOrderId={currentOrderId}
                currentOrderLines={orderLines}
                onLoadOrder={handleLoadOrder}
                onNewOrder={handleNewOrder}
              />
            }
          />
        </Box>
      </Box>

      {/* KOR Layout: Order Button Section (5%) */}
      <Box sx={{ 
        height: '5%',
        minHeight: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
        p: 1
      }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={orderLines.length === 0}
          onClick={handleSubmitOrder}
          sx={{
            maxWidth: '400px',
            height: '100%',
            fontSize: '1.1rem',
            fontWeight: 600
          }}
        >
          {t('order.submit') || 'Submit Order'}
        </Button>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("authenticated") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("authenticated") === "true");
    };

    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={isAuthenticated ? <MainContent /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App; 