import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { orderService, SavedOrder } from '../services/orderService';
import '../styles/OrderManagement.css';

interface OrderManagementProps {
  currentOrderId: string | null;
  currentOrderLines: any[];
  onLoadOrder: (orderLines: SavedOrder['orderLines'], orderId: string) => void;
  onNewOrder: () => void;
}

// Custom hook for handling the auto-show dialog timer
const useAutoShowDialog = (
  shouldShow: boolean,
  delay: number,
  onShow: () => void
) => {
  useEffect(() => {
    if (!shouldShow) return;

    const timeoutId = setTimeout(() => {
      onShow();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [shouldShow, delay, onShow]);
};

const OrderManagement: React.FC<OrderManagementProps> = ({
  currentOrderId,
  currentOrderLines,
  onLoadOrder,
  onNewOrder,
}) => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showNewOrderDialog, setShowNewOrderDialog] = useState(false);
  const [newOrderName, setNewOrderName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [nameError, setNameError] = useState('');
  const [duplicateOrder, setDuplicateOrder] = useState(false);
  const [isFirstOrder, setIsFirstOrder] = useState(true);

  // Use the custom hook for auto-showing the dialog
  useAutoShowDialog(
    currentOrderLines.length > 0 && !currentOrderId,
    2000,
    () => setShowNewOrderDialog(true)
  );

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    // Check if this is the first order
    const orders = orderService.getAllOrders();
    setIsFirstOrder(orders.length === 0);
  }, [orders.length]);

  useEffect(() => {
    if (currentOrderId) {
      const currentOrder = orders.find(order => order.id === currentOrderId);
      if (currentOrder) {
        setEditedName(currentOrder.name);
      }
    }
  }, [currentOrderId, orders]);

  useEffect(() => {
    if (showNewOrderDialog) {
      const date = new Date();
      const dateStr = date.toLocaleDateString();
      const orderCount = orders.length + 1;
      setNewOrderName(`${dateStr} - Order ${orderCount}`);
    }
  }, [showNewOrderDialog, orders.length]);

  useEffect(() => {
    if (orders.length === 0 && isOpen) {
      setIsOpen(false);
    }
  }, [orders.length, isOpen]);

  useEffect(() => {
    if (orders.length === 0 && currentOrderLines.length > 0) {
      setShowNewOrderDialog(true);
    }
  }, [currentOrderLines.length, orders.length]);

  const loadOrders = () => {
    const savedOrders = orderService.getAllOrders();
    const sortedOrders = savedOrders.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setOrders(sortedOrders);
  };

  const handleLoadOrder = (order: SavedOrder) => {
    // First save the current order if it exists
    if (currentOrderId) {
      try {
        // Save current order with all its changes
        orderService.updateOrder(currentOrderId, currentOrderLines);
        console.log('Current order saved before switching:', { currentOrderId, currentOrderLines });
        
        // Refresh orders list to ensure we have the latest data
        loadOrders();
      } catch (error) {
        console.error('Error saving current order:', error);
      }
    }
    
    // Then load the new order
    onLoadOrder(order.orderLines, order.id);
    setIsOpen(false);
  };

  const handleDeleteOrder = (id: string) => {
    if (window.confirm(t('orderManagement.confirmDelete'))) {
      const orders = orderService.getAllOrders();
      const currentIndex = orders.findIndex(order => order.id === id);
      
      // Delete the order
      orderService.deleteOrder(id);
      loadOrders(); // Refresh the order list
      
      // If there are other orders, load the previous one
      if (orders.length > 1) {
        const previousOrder = orders[currentIndex - 1] || orders[0];
        onLoadOrder(previousOrder.orderLines, previousOrder.id);
      } else {
        // If this was the last order, clear the current order
        onNewOrder();
      }
    }
  };

  const handleNewOrder = () => {
    // Save current order if it exists
    if (currentOrderId) {
      try {
        orderService.updateOrder(currentOrderId, currentOrderLines);
        console.log('Current order saved before creating new:', { currentOrderId, currentOrderLines });
        loadOrders(); // Refresh orders list
      } catch (error) {
        console.error('Error saving current order:', error);
      }
    }
    setShowNewOrderDialog(true);
  };

  const validateOrderName = (name: string, currentId?: string): boolean => {
    if (!name.trim()) {
      setNameError(t('orderManagement.nameRequired'));
      return false;
    }

    const isDuplicate = orders.some(order => 
      order.name.toLowerCase() === name.toLowerCase() && order.id !== currentId
    );

    if (isDuplicate) {
      setNameError(t('orderManagement.nameDuplicate'));
      return false;
    }

    setNameError('');
    return true;
  };

  const handleCreateNewOrder = () => {
    if (validateOrderName(newOrderName)) {
      try {
        // Create new order without duplication for first order
        const newOrderId = orderService.saveOrder(
          isFirstOrder ? currentOrderLines : (duplicateOrder ? currentOrderLines : []),
          newOrderName.trim()
        );
        
        // Refresh orders list
        loadOrders();
        
        // Load the newly created order
        onLoadOrder(isFirstOrder ? currentOrderLines : (duplicateOrder ? currentOrderLines : []), newOrderId);
        
        // Reset dialog state
        setShowNewOrderDialog(false);
        setNewOrderName('');
        setDuplicateOrder(false);
        
        console.log('New order created successfully:', { newOrderId, isFirstOrder });
      } catch (error) {
        console.error('Error creating new order:', error);
      }
    }
  };

  const handleUpdateOrderName = () => {
    if (currentOrderId && validateOrderName(editedName, currentOrderId)) {
      const currentOrder = orders.find(order => order.id === currentOrderId);
      if (currentOrder) {
        orderService.updateOrderName(currentOrderId, editedName.trim());
        loadOrders();
        setIsEditingName(false);
      }
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const currentOrder = orders.find(order => order.id === currentOrderId);
  const isCurrentOrderEmpty = currentOrderLines.length === 0;
  const hasOtherOrders = orders.length > 1;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdateOrderName();
    } else if (e.key === 'Escape') {
      setIsEditingName(false);
      setEditedName(currentOrder?.name || '');
      setNameError('');
    }
  };

  return (
    <div className="order-management">
      {currentOrder ? (
        <div className="current-order-title">
          {isEditingName ? (
            <div className="title-container">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`title-input ${nameError ? 'error' : ''}`}
                autoFocus
              />
              {nameError && <span className="error-message">{nameError}</span>}
            </div>
          ) : (
            <div className="title-container">
              <h2>{currentOrder.name}</h2>
              <button 
                className="edit-name-button"
                onClick={() => setIsEditingName(true)}
                title={t('orderManagement.editName')}
              >
                ✎
              </button>
              <button 
                className="delete-order-button"
                onClick={() => handleDeleteOrder(currentOrder.id)}
                title={t('orderManagement.delete')}
              >
                🗑️
              </button>
              <button 
                className={`saved-orders-toggle ${!hasOtherOrders ? 'disabled' : ''}`}
                onClick={() => hasOtherOrders && setIsOpen(!isOpen)}
                title={hasOtherOrders ? t('orderManagement.savedOrders') : t('orderManagement.noSavedOrders')}
                disabled={!hasOtherOrders}
              >
                ▼
              </button>
              <button 
                className="new-order-button"
                onClick={handleNewOrder}
                title={t('orderManagement.newOrder')}
              >
                +
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="title-container">
          <h2>{t('orderManagement.emptyOrderMessage')}</h2>
        </div>
      )}

      {isOpen && hasOtherOrders && (
        <div className="saved-orders-panel">
          {orders.length === 0 ? (
            <p className="no-orders">
              {t('orderManagement.empty')}
            </p>
          ) : (
            <ul className="orders-list">
              {orders.map((order) => (
                <li 
                  key={order.id} 
                  className={`order-item ${order.id === currentOrderId ? 'active' : ''}`}
                  onClick={() => handleLoadOrder(order)}
                >
                  <div className="order-info">
                    <span className="order-name">{order.name}</span>
                    <span className="order-details">
                      {formatDate(order.date)} • {order.orderLines.length} {t('orderManagement.items')}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {showNewOrderDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{t('orderManagement.createNewOrder')}</h3>
            <div className="input-group">
              <label htmlFor="orderName">
                {t('orderManagement.orderName')}
              </label>
              <input
                type="text"
                id="orderName"
                value={newOrderName}
                onChange={(e) => setNewOrderName(e.target.value)}
                className={nameError ? 'error' : ''}
                autoFocus
              />
              {nameError && <span className="error-message">{nameError}</span>}
            </div>
            {!isFirstOrder && currentOrderLines.length > 0 && (
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={duplicateOrder}
                    onChange={(e) => setDuplicateOrder(e.target.checked)}
                  />
                  {t('orderManagement.duplicateOrder')}
                </label>
              </div>
            )}
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => {
                  setShowNewOrderDialog(false);
                  setNameError('');
                  setDuplicateOrder(false);
                }}
              >
                {t('orderManagement.cancel')}
              </button>
              <button 
                className="create-button"
                onClick={handleCreateNewOrder}
              >
                {t('orderManagement.create')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement; 