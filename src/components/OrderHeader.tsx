import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/Order.css";

interface Customer {
  id: string;
  name: string;
}

interface OrderHeaderProps {
  orderName: string;
  onOrderNameChange: (name: string) => void;
  customer: string;
  onCustomerChange: (customer: string) => void;
  isEditing: boolean;
  onEditClick: () => void;
  onSaveClick: () => void;
  date: string;
  totalVolume: number;
  totalWeight: number;
}

const OrderHeader = ({
  orderName,
  onOrderNameChange,
  customer,
  onCustomerChange,
  isEditing,
  onEditClick,
  onSaveClick,
  date,
  totalVolume,
  totalWeight,
}: OrderHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="order-header">
      <div className="order-header-left">
        <div className="order-title">
          {isEditing ? (
            <input
              type="text"
              value={orderName}
              onChange={(e) => onOrderNameChange(e.target.value)}
              placeholder={t("order.titlePlaceholder", { defaultValue: "Order Title" })}
              className="order-title-input"
            />
          ) : (
            <h2>{orderName || t("order.untitled", { defaultValue: "Untitled Order" })}</h2>
          )}
        </div>
        <div className="order-customer">
          {isEditing ? (
            <input
              type="text"
              value={customer}
              onChange={(e) => onCustomerChange(e.target.value)}
              placeholder={t("order.customerPlaceholder", { defaultValue: "Customer Name" })}
              className="customer-input"
            />
          ) : (
            <span>{customer || t("order.noCustomer", { defaultValue: "No Customer" })}</span>
          )}
        </div>
        <div className="order-date">
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
      <div className="order-header-right">
        <div className="order-totals">
          <div className="total-item">
            <span className="label">{t("order.totalVolume", { defaultValue: "Total Volume" })}:</span>
            <span className="value">{totalVolume.toFixed(2)} m³</span>
          </div>
          <div className="total-item">
            <span className="label">{t("order.totalWeight", { defaultValue: "Total Weight" })}:</span>
            <span className="value">{totalWeight.toFixed(2)} kg</span>
          </div>
        </div>
        <div className="order-actions">
          {isEditing ? (
            <button onClick={onSaveClick} className="save-button">
              {t("order.save", { defaultValue: "Save" })}
            </button>
          ) : (
            <button onClick={onEditClick} className="edit-button">
              {t("order.edit", { defaultValue: "Edit" })}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHeader; 