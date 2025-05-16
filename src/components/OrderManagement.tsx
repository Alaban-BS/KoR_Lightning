import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { orderService, SavedOrder } from '../services/orderService';
import { OrderLine, Product } from '../types';
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

export const OrderManagement: React.FC<OrderManagementProps> = ({
  currentOrderId,
  currentOrderLines,
  onLoadOrder,
  onNewOrder
}) => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Array<{ id: string; orderLines: OrderLine[] }>>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showNewOrderDialog, setShowNewOrderDialog] = useState(false);
  const [newOrderName, setNewOrderName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [nameError, setNameError] = useState('');
  const [duplicateOrder, setDuplicateOrder] = useState(false);
  const [isFirstOrder, setIsFirstOrder] = useState(true);

  // Load orders on mount
  useEffect(() => {
    const savedOrders = orderService.getAllOrders();
    setOrders(savedOrders);
  }, []);

  // Auto-show dialog if no orders exist
  useEffect(() => {
    if (orders.length === 0) {
      setShowDialog(true);
    }
  }, [orders]);

  useEffect(() => {
    // Check if this is the first order
    const orders = orderService.getAllOrders();
    setIsFirstOrder(orders.length === 0);
  }, [orders.length]);

  useEffect(() => {
    if (currentOrderId) {
      const currentOrder = orders.find((order: SavedOrder) => order.id === currentOrderId);
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

  const handleLoadOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      onLoadOrder(order.orderLines, order.id);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    try {
      orderService.deleteOrder(orderId);
      setOrders(prevOrders => prevOrders.filter(o => o.id !== orderId));
      if (currentOrderId === orderId) {
        onNewOrder();
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleCreateOrder = () => {
    if (!orderName.trim()) {
      setError(t('orderNameRequired'));
      return;
    }

    try {
      const newOrder = orderService.createOrder(orderName);
      setOrders(prevOrders => [...prevOrders, newOrder]);
      onLoadOrder(newOrder.orderLines, newOrder.id);
      setShowDialog(false);
      setOrderName('');
      setError(null);
    } catch (error) {
      console.error('Error creating order:', error);
      setError(t('errorCreatingOrder'));
    }
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
      } catch (error) {
        console.error('Error creating new order:', error);
      }
    }
  };

  const handleUpdateOrderName = () => {
    if (currentOrderId && validateOrderName(editedName, currentOrderId)) {
      const currentOrder = orders.find((order: SavedOrder) => order.id === currentOrderId);
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

  const currentOrder = orders.find((order: SavedOrder) => order.id === currentOrderId);
  const hasOtherOrders = orders.length > 1;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdateOrderName();
    } else if (e.key === 'Escape') {
      setIsEditingName(false);
      setEditedName(currentOrder?.name || '');
      setNameError('');
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleNewOrderNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewOrderName(e.target.value);
  };

  const handleDuplicateOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDuplicateOrder(e.target.checked);
  };

  const loadOrders = () => {
    const savedOrders = orderService.getAllOrders();
    const sortedOrders = savedOrders.sort((a: SavedOrder, b: SavedOrder) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setOrders(sortedOrders);
  };

  const validateOrderName = (name: string, currentId?: string): boolean => {
    if (!name.trim()) {
      setNameError(t('orderManagement.nameRequired'));
      return false;
    }

    const isDuplicate = orders.some((order: SavedOrder) => 
      order.name.toLowerCase() === name.toLowerCase() && order.id !== currentId
    );

    if (isDuplicate) {
      setNameError(t('orderManagement.nameDuplicate'));
      return false;
    }

    setNameError('');
    return true;
  };

  return (
    <div className="order-management">
      <div className="order-management-header">
        <h2>{t('orderManagement')}</h2>
        <button onClick={() => setShowDialog(true)} className="new-order-button">
          {t('newOrder')}
        </button>
      </div>

      {showDialog && (
        <div className="order-dialog">
          <div className="order-dialog-content">
            <h3>{t('createNewOrder')}</h3>
            <input
              type="text"
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
              placeholder={t('enterOrderName')}
              className={error ? 'error' : ''}
            />
            {error && <div className="error-message">{error}</div>}
            <div className="dialog-buttons">
              <button onClick={handleCreateOrder}>{t('create')}</button>
              <button onClick={() => setShowDialog(false)}>{t('cancel')}</button>
            </div>
          </div>
        </div>
      )}

      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-item-header">
              <span>{order.id}</span>
              <div className="order-item-actions">
                <button onClick={() => handleLoadOrder(order.id)}>
                  {t('load')}
                </button>
                <button onClick={() => handleDeleteOrder(order.id)}>
                  {t('delete')}
                </button>
              </div>
            </div>
            <div className="order-item-details">
              {order.orderLines.map((line) => (
                <div key={line.SKU} className="order-line">
                  <span>{line.SKU}</span>
                  <span>{line.qty}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {currentOrder ? (
        <div className="current-order-title">
          {isEditingName ? (
            <div className="title-container">
              <input
                type="text"
                value={editedName}
                onChange={handleNameChange}
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
                onClick={onNewOrder}
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
              {orders.map((order: SavedOrder) => (
                <li 
                  key={order.id} 
                  className={`order-item ${order.id === currentOrderId ? 'active' : ''}`}
                  onClick={() => handleLoadOrder(order.id)}
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
                onChange={handleNewOrderNameChange}
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
                    onChange={handleDuplicateOrderChange}
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