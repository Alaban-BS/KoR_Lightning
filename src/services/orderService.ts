import { OrderLine } from '../types';

const ORDER_STORAGE_KEY = 'saved_orders';

export interface SavedOrder {
  id: string;
  name: string;
  date: string;
  orderLines: OrderLine[];
}

export const orderService = {
  saveOrder: (orderLines: OrderLine[], name: string): string => {
    const orders = orderService.getAllOrders();
    const newOrder: SavedOrder = {
      id: Date.now().toString(),
      name,
      date: new Date().toISOString(),
      orderLines
    };
    orders.push(newOrder);
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
    return newOrder.id;
  },

  getAllOrders: (): SavedOrder[] => {
    const orders = localStorage.getItem(ORDER_STORAGE_KEY);
    return orders ? JSON.parse(orders) : [];
  },

  getOrder: (id: string): SavedOrder | null => {
    const orders = orderService.getAllOrders();
    return orders.find(order => order.id === id) || null;
  },

  deleteOrder: (id: string): void => {
    const orders = orderService.getAllOrders();
    const updatedOrders = orders.filter(order => order.id !== id);
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updatedOrders));
  },

  updateOrder: (id: string, orderLines: OrderLine[], name?: string): void => {
    try {
      const orders = orderService.getAllOrders();
      const orderIndex = orders.findIndex(order => order.id === id);
      
      if (orderIndex !== -1) {
        // Create a new order object with updated lines
        const updatedOrder = {
          ...orders[orderIndex],
          orderLines: [...orderLines], // Create a new array to ensure state updates
          ...(name && { name }),
          date: new Date().toISOString()
        };
        
        // Update the order in the array
        orders[orderIndex] = updatedOrder;
        
        // Save to localStorage
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
        
        // Verify the update was successful
        const savedOrders = orderService.getAllOrders();
        const savedOrder = savedOrders.find(order => order.id === id);
        
        if (!savedOrder) {
          throw new Error('Order not found after save');
        }
        
        if (JSON.stringify(savedOrder.orderLines) !== JSON.stringify(orderLines)) {
          throw new Error('Order lines mismatch after save');
        }
        
        console.log('Order updated successfully:', { id, orderLines });
      }
    } catch (error) {
      console.error('Error in updateOrder:', error);
      throw error;
    }
  },

  updateOrderName: (id: string, name: string): void => {
    const orders = orderService.getAllOrders();
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex !== -1) {
      orders[orderIndex] = {
        ...orders[orderIndex],
        name,
        date: new Date().toISOString()
      };
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
    }
  }
}; 