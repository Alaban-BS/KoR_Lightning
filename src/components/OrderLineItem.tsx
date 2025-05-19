import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
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
  const hasDiscount = pricing.totalDiscountRate > 0;
  const hasPalletDiscount = pricing.isPalletMultiple;
  const promotionDiscount = hasDiscount ? pricing.totalDiscountRate - (hasPalletDiscount ? Number(product["Colli discount"]) : 0) : 0;
  const palletDiscount = hasPalletDiscount ? Number(product["Colli discount"]) : 0;

  return (
    <div className="order-line">
      <div className="order-line-info">
        <h3>{product.Name}</h3>
        <p className="sku">SKU: {product.SKU}</p>
      </div>

      <div className="quantity">
        <span>{line.qty}</span>
      </div>

      <div className="price">
        <div className="price-stack">
          <div className="price-line">
            {hasDiscount && (
              <span className="base-price strike">€{pricing.basePrice.toFixed(2)}</span>
            )}
            <span className={`${hasDiscount ? 'discount-price' : 'base-price'}`}>
              €{pricing.finalPrice.toFixed(2)}
            </span>
          </div>
          {hasPalletDiscount && (
            <span className="pallet-advantage">
              Pallet korting: {palletDiscount}%
            </span>
          )}
        </div>
      </div>

      <div className="total">
        <span className="total-amount">€{pricing.lineTotal.toFixed(2)}</span>
        {pricing.savedAmount > 0 && (
          <div className="total-savings-line">
            {promotionDiscount > 0 && (
              <span className="savings-item promotion-savings">
                Promotie: -€{((pricing.basePrice * line.qty * promotionDiscount) / 100).toFixed(2)}
              </span>
            )}
            {hasPalletDiscount && (
              <span className="savings-item pallet-savings">
                Pallet: -€{((pricing.basePrice * line.qty * palletDiscount) / 100).toFixed(2)}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="volume-weight">
        <span className="volume">{volume.toFixed(2)} m³</span>
        <span className="weight">{weight.toFixed(2)} kg</span>
      </div>

      <button className="remove-button" onClick={onRemove}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default OrderLineItem;
