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

interface Props {
  line: OrderLine;
  product: Product;
  pricing: Pricing;
  volume: number;
  weight: number;
  onRemove: () => void;
}

/* ——— component ——— */
const OrderLineItem: React.FC<Props> = ({
  line,
  product,
  pricing,
  volume,
  weight,
  onRemove,
}) => {
  const { t } = useTranslation() as {
    t: (key: string, options?: any) => string;
  };

  const basePrice = pricing.basePrice;
  const normalDiscount = Number(product["Discount %"]) || 0;
  const colliDiscount = Number(product["Colli discount"]) || 0;
  const colliPerPallet = Number(product["Colli per pallet"]) || 0;

  const isFullPalletQty = colliPerPallet > 0 && line.qty % colliPerPallet === 0;

  const hasNormalDiscount = normalDiscount > 0;
  const hasColliDiscount = colliDiscount > 0 && isFullPalletQty;

  const customerPrice = hasNormalDiscount
    ? basePrice * (1 - normalDiscount / 100)
    : null;

  const palletPrice =
    hasColliDiscount && customerPrice !== null
      ? customerPrice * (1 - colliDiscount / 100)
      : hasColliDiscount
      ? basePrice * (1 - colliDiscount / 100)
      : null;

  const finalPrice: "base" | "customer" | "pallet" = hasColliDiscount
    ? "pallet"
    : hasNormalDiscount
    ? "customer"
    : "base";

  const finalUnitPrice =
    finalPrice === "pallet"
      ? palletPrice!
      : finalPrice === "customer"
      ? customerPrice!
      : basePrice;

  const totalSavings = basePrice * line.qty - finalUnitPrice * line.qty;

  const promoSavings =
    hasNormalDiscount && customerPrice !== null
      ? (basePrice - customerPrice) * line.qty
      : 0;

  const palletSavings =
    hasColliDiscount && palletPrice !== null
      ? ((customerPrice || basePrice) - palletPrice) * line.qty
      : 0;

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
