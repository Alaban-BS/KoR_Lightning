import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from "react-i18next";
import "../styles/Order.css";
import { Product, OrderLine } from "../types";

/* ——— types ——— */
interface Pricing {
  basePrice: number;
  finalPrice: number;
  totalDiscountRate: number;
  lineTotal: number;
  isPalletMultiple: boolean;
  savedAmount: number;
}

interface OrderLineItemProps {
  line: OrderLine;
  product: Product;
  pricing: Pricing;
  volume: number;
  weight: number;
  onRemove: () => void;
}

/* ——— component ——— */
const OrderLineItem = ({
  line,
  product,
  pricing,
  volume,
  weight,
  onRemove,
}: OrderLineItemProps) => {
  const { t } = useTranslation();

  return (
    <div className="order-line">
      <div className="order-line-content">
        <div className="order-line-info">
          <h3>{product.Name}</h3>
          <p className="sku">SKU: {product.SKU}</p>
        </div>
        <div className="order-line-details">
          <div className="quantity">
            <span>{line.qty}</span>
          </div>
          <div className="price">
            <span>€{pricing.finalPrice.toFixed(2)}</span>
            {pricing.totalDiscountRate > 0 && (
              <span className="discount">-{pricing.totalDiscountRate}%</span>
            )}
          </div>
          <div className="total">
            <span>€{pricing.lineTotal.toFixed(2)}</span>
          </div>
          <div className="volume-weight">
            <span>{volume.toFixed(2)} m³</span>
            <span>{weight.toFixed(2)} kg</span>
          </div>
          <button className="remove-button" onClick={onRemove}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderLineItem;
