import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { orderService, SavedOrder } from '../services/orderService';
import '../styles/SavedOrders.css';

interface SavedOrdersProps {
  onLoadOrder: (orderLines: SavedOrder['orderLines']) => void;
}

const SavedOrders: React.FC<SavedOrdersProps> = ({ onLoadOrder }) => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = orderService.getAllOrders();
    setOrders(savedOrders);
  };

  const handleLoadOrder = (order: SavedOrder) => {
    onLoadOrder(order.orderLines);
    setIsOpen(false);
  };

  const handleDeleteOrder = (id: string) => {
    if (window.confirm(t('savedOrders.confirmDelete', { defaultValue: 'Are you sure you want to delete this order?' }))) {
      orderService.deleteOrder(id);
      loadOrders();
    }
  };

  return (
    <div className="saved-orders">
      <button 
        className="saved-orders-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {t('savedOrders.title', { defaultValue: 'Saved Orders' })}
      </button>

      {isOpen && (
        <div className="saved-orders-panel">
          {orders.length === 0 ? (
            <p className="no-orders">
              {t('savedOrders.empty', { defaultValue: 'No saved orders found.' })}
            </p>
          ) : (
            <ul className="orders-list">
              {orders.map((order) => (
                <li key={order.id} className="order-item">
                  <div className="order-info">
                    <span className="order-name">{order.name}</span>
                    <span className="order-date">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="order-actions">
                    <button
                      className="load-order"
                      onClick={() => handleLoadOrder(order)}
                    >
                      {t('savedOrders.load', { defaultValue: 'Load' })}
                    </button>
                    <button
                      className="delete-order"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      {t('savedOrders.delete', { defaultValue: 'Delete' })}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedOrders; 