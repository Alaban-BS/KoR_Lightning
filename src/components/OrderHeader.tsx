import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/OrderHeader.css';

interface Customer {
  id: string;
  name: string;
}

interface OrderHeaderProps {
  orderName: string;
  onOrderNameChange: (name: string) => void;
  customer: string;
  onCustomerChange: (customerId: string) => void;
  customers: Customer[];
  totalVolume: number;
  totalWeight: number;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({
  orderName,
  onOrderNameChange,
  customer,
  onCustomerChange,
  customers,
  totalVolume,
  totalWeight
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="order-header">
      <div className="order-header-left">
        <div className="order-header-item">
          <label>Order Name:</label>
          {!orderName ? (
            <div className="empty-order-message">
              {t('orderManagement.emptyOrderMessage')}
            </div>
          ) : (
            <input
              type="text"
              value={orderName}
              onChange={(e) => onOrderNameChange(e.target.value)}
              placeholder={t('orderManagement.emptyOrderMessage')}
            />
          )}
        </div>
        <div className="order-header-item">
          <label>Customer:</label>
          <select value={customer} onChange={(e) => onCustomerChange(e.target.value)}>
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="order-header-item">
          <label>Date:</label>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
      <div className="order-header-right">
        <div className="order-header-item">
          <label>Total Volume:</label>
          <span>{totalVolume.toFixed(2)} m³</span>
        </div>
        <div className="order-header-item">
          <label>Total Weight:</label>
          <span>{totalWeight.toFixed(2)} kg</span>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader; 