'use client';

import { useState } from 'react';
import OrderManagement from '@/components/OrderManagement';
import PriceList from '@/components/PriceList';
import Order from '@/components/Order';
import { SavedOrder } from '@/services/orderService';
import { Product, OrderLine } from '@/types';
import '@/styles/Dashboard.css';

// Import customer pricing data
import customerPricing from '../../../public/CustomerPricing.json';

// Flag mapping for country flags
const flagMapping: Record<string, string> = {
  'Germany': 'de',
  'The Netherlands': 'nl',
  'France': 'fr',
  'Italy': 'it',
  'Spain': 'es',
  'United Kingdom': 'gb',
  'United States of America': 'us',
  'Turkey': 'tr',
  'Greece': 'gr',
  'Hungary': 'hu',
  'Colombia': 'co',
  'Panama': 'pa',
  'Armenia': 'am',
  'Belgium': 'be',
  'Poland': 'pl'
};

// Mock stock data (replace with actual stock data when available)
const mockStockData = (customerPricing as unknown as Product[]).map((product) => ({
  SKU: product.SKU,
  'Qty Available': Math.floor(Math.random() * 100),
  'Lead Time (days)': Math.floor(Math.random() * 15)
}));

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
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Price List Section */}
        <div className="price-list-section">
          <div className="price-list-header">
            <h2>Product Catalog</h2>
          </div>
          <div className="price-list-content">
            <PriceList
              productData={customerPricing as Product[]}
              orderLines={currentOrderLines}
              setOrderLines={setCurrentOrderLines}
              flagMapping={flagMapping}
              stockData={mockStockData}
            />
          </div>
        </div>

        {/* Order Section */}
        <div className="order-section">
          <div className="order-header">
            <h2>Current Order</h2>
          </div>
          <div className="order-content">
            <OrderManagement
              currentOrderId={currentOrderId}
              currentOrderLines={currentOrderLines}
              onLoadOrder={handleLoadOrder}
              onNewOrder={handleNewOrder}
            />
            <Order
              orderLines={currentOrderLines}
              productData={customerPricing as Product[]}
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
          </div>
        </div>
      </div>

      {/* Submit Button Section */}
      <div className="submit-section">
        <button 
          className="submit-button"
          disabled={currentOrderLines.length === 0}
          onClick={() => {/* Handle order submission */}}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
} 