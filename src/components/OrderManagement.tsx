import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { orderService, SavedOrder } from '../services/orderService';
import { OrderLine } from '../types';
import '../styles/OrderManagement.css';

interface OrderManagementProps {
  currentOrderId: string | null;
  currentOrderLines: OrderLine[];
  onLoadOrder: (loadedOrderLines: OrderLine[], orderId: string) => void;
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

function OrderManagement({
  currentOrderId,
  currentOrderLines,
  onLoadOrder,
  onNewOrder
}: OrderManagementProps) {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [showNewOrderDialog, setShowNewOrderDialog] = useState(false);
  const [newOrderName, setNewOrderName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [nameError, setNameError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Load orders on mount and when orders change
  useEffect(() => {
    loadOrders();
  }, []);

  // Auto-create first order if none exists
  useEffect(() => {
    if (orders.length === 0 && currentOrderLines.length > 0) {
      const date = new Date();
      const dateStr = date.toLocaleDateString();
      const newOrderId = orderService.saveOrder(currentOrderLines, `${dateStr} - Order 1`);
      loadOrders();
      onLoadOrder(currentOrderLines, newOrderId);
    }
  }, [currentOrderLines, orders.length, onLoadOrder]);

  // Update edited name when current order changes
  useEffect(() => {
    if (currentOrderId) {
      const currentOrder = orders.find(order => order.id === currentOrderId);
      if (currentOrder) {
        setEditedName(currentOrder.name);
      }
    }
  }, [currentOrderId, orders]);

  // Save order changes when order lines change
  useEffect(() => {
    if (currentOrderId && currentOrderLines.length > 0) {
      try {
        orderService.updateOrder(currentOrderId, currentOrderLines);
        loadOrders(); // Refresh orders list to show updated data
      } catch (error) {
        console.error('Error saving order changes:', error);
      }
    }
  }, [currentOrderLines, currentOrderId]);

  const loadOrders = () => {
    const savedOrders = orderService.getAllOrders();
    const sortedOrders = savedOrders.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setOrders(sortedOrders);
  };

  const handleLoadOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      onLoadOrder(order.orderLines, order.id);
      setIsOpen(false); // Close the orders panel
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    try {
      orderService.deleteOrder(orderId);
      loadOrders();
      if (currentOrderId === orderId) {
        onNewOrder();
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleCreateNewOrder = () => {
    if (validateOrderName(newOrderName)) {
      try {
        const newOrderId = orderService.saveOrder([], newOrderName.trim());
        loadOrders();
        onLoadOrder([], newOrderId);
        setShowNewOrderDialog(false);
        setNewOrderName('');
      } catch (error) {
        console.error('Error creating new order:', error);
      }
    }
  };

  const handleUpdateOrderName = () => {
    if (currentOrderId && validateOrderName(editedName, currentOrderId)) {
      try {
        orderService.updateOrderName(currentOrderId, editedName.trim());
        loadOrders();
        setIsEditingName(false);
      } catch (error) {
        console.error('Error updating order name:', error);
      }
    }
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

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleUpdateOrderName();
    }
  };

  const currentOrder = orders.find(order => order.id === currentOrderId);

  return (
    <div className="order-management">
      <div className="order-management-header">
        <div className="current-order-title">
          <div className="title-container">
            {isEditingName ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleUpdateOrderName}
                className={nameError ? 'error' : ''}
                autoFocus
              />
            ) : (
              <h2 onClick={() => setIsEditingName(true)}>
                {currentOrder?.name || t('newOrder')}
              </h2>
            )}
            {nameError && <div className="error-message">{nameError}</div>}
          </div>
          <button
            className="edit-name-button"
            onClick={() => setIsEditingName(true)}
            title={t('editOrderName')}
          >
            ✎
          </button>
        </div>
        <div className="order-management-buttons">
          <button
            className="saved-orders-toggle"
            onClick={() => setIsOpen(!isOpen)}
            title={t('savedOrders')}
          >
            📋
          </button>
          <button
            className="new-order-button"
            onClick={() => setShowNewOrderDialog(true)}
            title={t('newOrder')}
          >
            +
          </button>
        </div>
      </div>

      {showNewOrderDialog && (
        <div className="order-dialog">
          <div className="order-dialog-content">
            <h3>{t('createNewOrder')}</h3>
            <input
              type="text"
              value={newOrderName}
              onChange={(e) => setNewOrderName(e.target.value)}
              placeholder={t('enterOrderName')}
              className={nameError ? 'error' : ''}
            />
            {nameError && <div className="error-message">{nameError}</div>}
            <div className="dialog-buttons">
              <button onClick={handleCreateNewOrder}>{t('create')}</button>
              <button onClick={() => {
                setShowNewOrderDialog(false);
                setNewOrderName('');
                setNameError('');
              }}>{t('cancel')}</button>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="saved-orders-panel">
          {orders.length > 0 ? (
            <ul className="orders-list">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className={`order-item ${order.id === currentOrderId ? 'active' : ''}`}
                >
                  <div className="order-info" onClick={() => handleLoadOrder(order.id)}>
                    <span className="order-name">{order.name}</span>
                    <span className="order-details">
                      {order.orderLines.length} {t('items')} • {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="order-actions">
                    <button
                      className="load-order"
                      onClick={() => handleLoadOrder(order.id)}
                    >
                      {t('load')}
                    </button>
                    <button
                      className="delete-order"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      {t('delete')}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-orders">
              {t('noSavedOrders')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderManagement; 