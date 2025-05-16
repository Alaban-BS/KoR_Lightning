import React, { useEffect, useRef, useState } from "react";
import "../styles/Order.css";
import { Product, OrderLine } from "../types";
import { useTranslation } from "react-i18next";
import OrderLineItem from "./OrderLineItem";

interface OrderProps {
  orderLines: OrderLine[];
  productData: Product[];
  onRemoveLine: (sku: string) => void;
  orderManagement?: React.ReactNode;
}

const Order = ({
  orderLines,
  productData,
  onRemoveLine,
  orderManagement
}: OrderProps) => {
  const { t } = useTranslation() as {
    t: (key: string, options?: any) => string;
  };

  const orderListRef = useRef<HTMLDivElement>(null);
  const [highlightSKU, setHighlightSKU] = useState<string | null>(null);
  const [removingSKU, setRemovingSKU] = useState<string | null>(null);
  const prevOrderLinesRef = useRef<OrderLine[]>([]);

  // Track changes in order lines
  useEffect(() => {
    // Create a map of previous lines for quick lookup
    const prevLinesMap = new Map(
      prevOrderLinesRef.current.map(line => [line.SKU, line])
    );

    // Find which line was updated by comparing with previous state
    orderLines.forEach(line => {
      const prevLine = prevLinesMap.get(line.SKU);
      // Highlight if it's a new line or if the quantity changed
      if (!prevLine || prevLine.qty !== line.qty) {
        setHighlightSKU(line.SKU);
      }
    });

    // Also check for removed lines
    prevOrderLinesRef.current.forEach(prevLine => {
      if (!orderLines.some(line => line.SKU === prevLine.SKU)) {
        setHighlightSKU(prevLine.SKU);
      }
    });

    // Update the previous state reference
    prevOrderLinesRef.current = [...orderLines];
  }, [orderLines]);

  useEffect(() => {
    if (orderListRef.current) {
      orderListRef.current.scrollTop = orderListRef.current.scrollHeight;
    }
  }, [orderLines.length]);

  useEffect(() => {
    if (highlightSKU) {
      const timeout = setTimeout(() => setHighlightSKU(null), 600);
      return () => clearTimeout(timeout);
    }
  }, [highlightSKU]);

  let totalVolume = 0;
  let totalWeight = 0;
  let totalCost = 0;

  const enrichedLines = orderLines
    .map((line) => {
      const product = productData.find((p) => p.SKU === line.SKU);
      if (!product) return null;

      const basePrice = Number(product["Order unit price"]) || 0;
      const normalDiscount = Number(product["Discount %"]) || 0;
      const colliDiscount = Number(product["Colli discount"]) || 0;
      const palletQty = Number(product["Colli per pallet"]) || 0;
      const isPalletMultiple = palletQty > 0 && line.qty >= palletQty;

      let totalDiscountRate = normalDiscount;
      if (isPalletMultiple) {
        totalDiscountRate += colliDiscount;
      }
      totalDiscountRate = Math.min(Math.max(totalDiscountRate, 0), 100);

      const finalPrice = basePrice * (1 - totalDiscountRate / 100);
      const lineTotal = finalPrice * line.qty;
      const savedAmount = basePrice * line.qty - lineTotal;

      const volume = (Number(product.M3) || 0) * line.qty;
      const weight = (Number(product.Weight_KG) || 0) * line.qty;

      totalVolume += volume;
      totalWeight += weight;
      totalCost += lineTotal;

      return {
        line,
        product,
        pricing: {
          basePrice,
          finalPrice,
          totalDiscountRate,
          lineTotal,
          isPalletMultiple,
          savedAmount,
        },
        volume,
        weight,
      };
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);

  const handleRemoveLine = (sku: string) => {
    setRemovingSKU(sku);
    setTimeout(() => {
      setRemovingSKU(null);
      onRemoveLine(sku);
    }, 300);
  };

  return (
    <div className="order">
      <div className="order-header">
        <div className="order-header-content">
          {orderManagement}
          {enrichedLines.length > 0 && (
            <div className="order-volume-weight-totals">
              <p>
                <strong>
                  {totalVolume.toFixed(2)} {t("order.m3", { defaultValue: "m³" })}
                </strong>
              </p>
              <p>
                <strong>
                  {totalWeight.toFixed(2)} {t("order.kg", { defaultValue: "kg" })}
                </strong>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="order-lines" ref={orderListRef}>
        {enrichedLines.length === 0 ? (
          <p className="order-empty-message">
            {t("order.empty", {
              defaultValue: "De bestelling bevat nog geen bestelregels.",
            })}
          </p>
        ) : (
          enrichedLines.map(({ line, product, pricing, volume, weight }) => {
            const highlight = highlightSKU === line.SKU;
            const removing = removingSKU === line.SKU && enrichedLines.length > 1;
            return (
              <div
                key={line.SKU}
                className={`order-line-wrapper ${
                  highlight ? "highlight-line" : ""
                } ${removing ? "fade-out-line" : ""}`.trim()}
              >
                <OrderLineItem
                  line={line}
                  product={product}
                  pricing={pricing}
                  volume={volume}
                  weight={weight}
                  onRemove={() => handleRemoveLine(line.SKU)}
                />
              </div>
            );
          })
        )}
      </div>

      {enrichedLines.length > 0 && (
        <button className="submit-order-button">
          <span>
            {t("order.submit", { defaultValue: "Bestelling plaatsen" })}
          </span>
          <span className="order-total-amount">€ {totalCost.toFixed(2)}</span>
        </button>
      )}
    </div>
  );
};

export default Order;
