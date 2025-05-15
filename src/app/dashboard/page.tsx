'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import OrderManagement from '@/components/OrderManagement';
import PriceList from '@/components/PriceList';
import Order from '@/components/Order';
import { SavedOrder } from '@/services/orderService';
import { Product, OrderLine } from '@/types';

// Mock data for products
const mockProducts: Product[] = [
  {
    SKU: 'P1',
    Name: 'Product 1',
    'Order unit price': '10.99',
    'Discount %': '0',
    'Colli discount': '0',
    'Colli per pallet': '0',
    M3: '0.1',
    Weight_KG: '1',
  },
  {
    SKU: 'P2',
    Name: 'Product 2',
    'Order unit price': '15.99',
    'Discount %': '5',
    'Colli discount': '0',
    'Colli per pallet': '0',
    M3: '0.2',
    Weight_KG: '2',
  },
];

export default function DashboardPage() {
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [currentOrderLines, setCurrentOrderLines] = useState<OrderLine[]>([]);

  const handleLoadOrder = (orderLines: SavedOrder['orderLines'], orderId: string) => {
    setCurrentOrderLines(orderLines);
    setCurrentOrderId(orderId);
  };

  const handleNewOrder = () => {
    setCurrentOrderLines([]);
    setCurrentOrderId(null);
  };

  const handleRemoveLine = (sku: string) => {
    setCurrentOrderLines(lines => lines.filter(line => line.SKU !== sku));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2, gap: 2 }}>
      {/* Price List - Top Section */}
      <Box sx={{ flex: '0 0 40%', minHeight: 0 }}>
        <PriceList
          productData={mockProducts}
          orderLines={currentOrderLines}
          setOrderLines={setCurrentOrderLines}
          flagMapping={{}}
          stockData={[]}
        />
      </Box>

      {/* Order Management and Order Form - Bottom Section */}
      <Box sx={{ flex: '0 0 60%', minHeight: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <OrderManagement
          currentOrderId={currentOrderId}
          currentOrderLines={currentOrderLines}
          onLoadOrder={handleLoadOrder}
          onNewOrder={handleNewOrder}
        />
        <Order
          orderLines={currentOrderLines}
          productData={mockProducts}
          onRemoveLine={handleRemoveLine}
          orderManagement={
            <OrderManagement
              currentOrderId={currentOrderId}
              currentOrderLines={currentOrderLines}
              onLoadOrder={handleLoadOrder}
              onNewOrder={handleNewOrder}
            />
          }
        />
      </Box>
    </Box>
  );
} 