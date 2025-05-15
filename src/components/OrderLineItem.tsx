import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "../styles/Order.css";

/* ——— types ——— */
interface OrderLine {
  SKU: string;
  qty: number;
}

interface Product {
  SKU: string;
  Name: string;
  ["Order unit price"]: number | string;
  ["Discount %"]?: number | string;
  ["Colli discount"]?: number | string;
  ["Colli per pallet"]?: number | string;
  ["order unit"]?: string;
}

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
      {/* product name + SKU + delete icon */}
      <div className="order-line-cell product-info">
        <span className="order-line-name">{product.Name}</span>
        <span className="order-line-sku">
          ({product.SKU})
          {FaTrashAlt({
            className: "remove-line-icon",
            style: { color: "red", cursor: "pointer", marginLeft: "8px" },
            onClick: (e) => {
              e.stopPropagation();
              onRemove();
            },
          })}
        </span>
      </div>

      {/* quantity */}
      <div className="order-line-cell order-line-qty">{line.qty}</div>

      {/* price stack */}
      <div className="order-line-cell order-line-price">
        <div className="price-stack">
          <span
            className={`price-value${finalPrice === "base" ? "" : " strike"}`}
          >
            € {basePrice.toFixed(2)}
          </span>

          {customerPrice !== null && (
            <>
              <span className="price-sep"> / </span>
              <span
                className={`new-price${
                  finalPrice === "customer" ? "" : " strike"
                }`}
              >
                € {customerPrice.toFixed(2)}
              </span>
            </>
          )}

          {palletPrice !== null && (
            <>
              <span className="price-sep"> / </span>
              <span
                className={`pallet-advantage${
                  finalPrice === "pallet" ? "" : " strike"
                }`}
              >
                € {palletPrice.toFixed(2)}
              </span>
            </>
          )}
        </div>
        <span className="subtext price-unit">{product["order unit"]}</span>
      </div>

      {/* line total + savings */}
      <div className="order-line-cell order-line-total">
        € {pricing.lineTotal.toFixed(2)}
        {totalSavings > 0 && (
          <div className="total-savings-line">
            <span className="savings-label">
              {t("order.savings", { defaultValue: "Savings:" })}{" "}
            </span>

            <span className="savings-total">€ {totalSavings.toFixed(2)}</span>

            {(promoSavings > 0 || palletSavings > 0) && (
              <span className="savings-breakdown">
                {" ("}
                {promoSavings > 0 && (
                  <span className="savings-promo">
                    € {promoSavings.toFixed(2)}
                  </span>
                )}
                {promoSavings > 0 && palletSavings > 0 && (
                  <span className="savings-plus"> + </span>
                )}
                {palletSavings > 0 && (
                  <span className="savings-pallet">
                    € {palletSavings.toFixed(2)}
                  </span>
                )}
                {")"}
              </span>
            )}
          </div>
        )}
      </div>

      {/* volume & weight */}
      <div className="order-line-cell order-line-volume-weight">
        <p className="volume">
          {volume.toFixed(2)} {t("order.m3", { defaultValue: "m³" })}
        </p>
        <span className="weight">
          {weight.toFixed(2)} {t("order.kg", { defaultValue: "kg" })}
        </span>
      </div>
    </div>
  );
};

export default OrderLineItem;
