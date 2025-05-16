import React from 'react';
import { OrderLine, Product } from '../types';
import { orderService } from '../services/orderService';

interface UseOrderManagementReturn {
  orderLines: OrderLine[];
  currentOrderId: string | null;
  productData: Product[];
  setOrderLines: (lines: OrderLine[]) => void;
  handleRemoveLine: (sku: string) => void;
  handleLoadOrder: (loadedOrderLines: OrderLine[], orderId: string) => void;
  handleNewOrder: () => void;
  handleSubmitOrder: () => void;
}

export const useOrderManagement = (): UseOrderManagementReturn => {
  const [productData, setProductData] = React.useState<Product[]>([]);
  const [orderLines, setOrderLines] = React.useState<OrderLine[]>([]);
  const [currentOrderId, setCurrentOrderId] = React.useState<string | null>(null);

  // Load saved order on initial load
  React.useEffect(() => {
    const savedOrders = orderService.getAllOrders();
    if (savedOrders.length > 0) {
      const latestOrder = savedOrders[savedOrders.length - 1];
      setOrderLines(latestOrder.orderLines);
      setCurrentOrderId(latestOrder.id);
    }
  }, []);

  // Auto-save order when it changes
  React.useEffect(() => {
    if (currentOrderId) {
      try {
        orderService.updateOrder(currentOrderId, orderLines);
      } catch (error) {
        console.error('Error updating order:', error);
      }
    }
  }, [orderLines, currentOrderId]);

  // Load product data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch("/CustomerPricing.json");
        const products: Product[] = await productRes.json();
        setProductData(products);
      } catch (error) {
        console.error("Error loading price list:", error);
      }
    };

    void fetchData();
  }, []);

  const handleRemoveLine = (sku: string) => {
    setOrderLines((prevLines: OrderLine[]) => {
      const newLines = prevLines
        .map((line: OrderLine) => (line.SKU === sku ? { ...line, qty: 0 } : line))
        .filter((line: OrderLine) => line.qty > 0);
      
      if (currentOrderId) {
        orderService.updateOrder(currentOrderId, newLines);
      }
      
      return newLines;
    });
  };

  const handleLoadOrder = (loadedOrderLines: OrderLine[], orderId: string) => {
    if (currentOrderId) {
      orderService.updateOrder(currentOrderId, orderLines);
    }
    setOrderLines(loadedOrderLines);
    setCurrentOrderId(orderId);
  };

  const handleNewOrder = () => {
    setOrderLines([]);
    setCurrentOrderId(null);
  };

  const handleSubmitOrder = () => {
    // TODO: Implement order submission logic
    console.log('Submitting order:', orderLines);
  };

  return {
    orderLines,
    currentOrderId,
    productData,
    setOrderLines,
    handleRemoveLine,
    handleLoadOrder,
    handleNewOrder,
    handleSubmitOrder
  };
}; 