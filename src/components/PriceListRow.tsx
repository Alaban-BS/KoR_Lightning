import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Product, OrderLine, FlagItem } from "../types";
import { roundQtyToPallet } from "../components/priceListUtils";
import Image from 'next/image';
import type { TFunction } from "i18next";
import type { CSSProperties } from 'react';

interface StockItem {
  SKU: string;
  "Qty Available": number;
  "Lead Time (days)": number;
}

type PriceListRowProps = {
  product: Product;
  orderLines: OrderLine[];
  setOrderLines: (value: OrderLine[] | ((prevState: OrderLine[]) => OrderLine[])) => void;
  flagMapping: Record<string, string>;
  palletCheckMap: Record<string, boolean>;
  setPalletCheckMap: (value: Record<string, boolean> | ((prevState: Record<string, boolean>) => Record<string, boolean>)) => void;
  style: CSSProperties;
  stockData: StockItem[];
};

const PriceListRow = ({
  product,
  orderLines,
  setOrderLines,
  flagMapping,
  palletCheckMap,
  setPalletCheckMap,
  style,
  stockData,
}: PriceListRowProps) => {
  const { t } = useTranslation() as { t: TFunction };
  const existingLine = orderLines.find((item: OrderLine) => item.SKU === product.SKU);
  const [localQty, setLocalQty] = useState<string>(
    existingLine ? existingLine.qty.toString() : "0"
  );
  const usePallet = palletCheckMap[product.SKU] ?? false;

  const setAndSaveQty = (newValue: number): void => {
    setLocalQty(newValue.toString());
    setOrderLines((prev: OrderLine[]) => {
      const existingIndex = prev.findIndex((line: OrderLine) => line.SKU === product.SKU);
      
      if (existingIndex !== -1) {
        const newLines = [...prev];
        if (newValue > 0) {
          newLines[existingIndex] = { SKU: product.SKU, qty: newValue };
        } else {
          newLines.splice(existingIndex, 1);
        }
        return newLines;
      } else if (newValue > 0) {
        return [...prev, { SKU: product.SKU, qty: newValue }];
      }
      
      return prev;
    });
  };

  const handleQtyChange = (e: { target: { value: string } }): void => {
    const typed = parseInt(e.target.value, 10) || 0;
    setAndSaveQty(typed);
  };

  const handleIncrement = (): void => {
    const current = parseInt(localQty, 10) || 0;
    const pallet = Number(product["Colli per pallet"]) || 1;
    setAndSaveQty(current + (usePallet ? pallet : 1));
  };

  const handleDecrement = (): void => {
    const current = parseInt(localQty, 10) || 0;
    if (current <= 0) return;
    const pallet = Number(product["Colli per pallet"]) || 1;
    setAndSaveQty(Math.max(0, current - (usePallet ? pallet : 1)));
  };

  const handleUsePalletChange = (e: { target: { checked: boolean } }): void => {
    const newUsePallet = e.target.checked;
    setPalletCheckMap((prev: Record<string, boolean>) => ({ ...prev, [product.SKU]: newUsePallet }));
    if (newUsePallet) {
      const pallet = Number(product["Colli per pallet"]) || 0;
      const qtyNum = parseInt(localQty, 10) || 0;
      setAndSaveQty(roundQtyToPallet(qtyNum, pallet));
    }
  };

  const origin = product["Origin of product"];
  const iso = flagMapping[origin]?.toUpperCase();
  const unitPrice = Number(product["Price unit price"]);
  const orderUnitPrice = Number(product["Order unit price"]);
  const discount = Number(product["Discount %"] || 0);
  const displayPrice = discount > 0 ? unitPrice * (1 - discount / 100) : unitPrice;
  const displayOrderPrice = discount > 0 ? orderUnitPrice * (1 - discount / 100) : orderUnitPrice;
  const colliPerPallet = Number(product["Colli per pallet"]) || 0;
  const stockItem = stockData.find((item: StockItem) => item.SKU === product.SKU);
  const qtyAvailable = stockItem?.["Qty Available"] || 0;
  const leadTime = stockItem?.["Lead Time (days)"] || 0;
  const stockStatus = qtyAvailable === 0 ? (leadTime < 16 ? "orange" : "red") : "green";

  return (
    <div className="table-row" style={style}>
      {/* Product Name & SKU */}
      <div className="cell left header-product">
        <div className="product-info">
          <span className="product-name">{product.Name}</span>
          <span className="sku-badge">{product.SKU}</span>
        </div>
      </div>

      {/* Price */}
      <div className="cell right header-prijs">
        <div className="price-block">
          <div className="price-container">
            <div className="price-line">
              {discount > 0 ? (
                <>
                  <span className="old-price">€ {orderUnitPrice.toFixed(2)}</span>
                  <span className="new-price">€ {displayOrderPrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="price-value">€ {orderUnitPrice.toFixed(2)}</span>
              )}
            </div>
            <span className="subtext order-unit">{product["order unit"]}</span>
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div className="cell header-stock">
        <span
          className={`stock-circle ${stockStatus}`}
          title={`${t("priceList.header.stock", { defaultValue: "Stock" })}: ${qtyAvailable}, ${t("priceList.header.leadTime", { defaultValue: "Lead time" })}: ${leadTime} ${t("priceList.header.days", { defaultValue: "days" })}`}
        >
          {stockStatus === 'green' ? '✓' : stockStatus === 'orange' ? '!' : '×'}
          <div className="stock-tooltip">
            {stockStatus === 'green' ? (
              `${qtyAvailable} ${t("priceList.stock.available", { defaultValue: "available" })}`
            ) : stockStatus === 'orange' ? (
              `${t("priceList.stock.lowStock", { defaultValue: "Low stock" })} (${qtyAvailable}), ${leadTime} ${t("priceList.stock.daysToRestock", { defaultValue: "days to restock" })}`
            ) : (
              `${t("priceList.stock.outOfStock", { defaultValue: "Out of stock" })}, ${leadTime} ${t("priceList.stock.daysToRestock", { defaultValue: "days to restock" })}`
            )}
          </div>
        </span>
      </div>

      {/* Origin / Flag */}
      <div className="cell header-herkomst">
        {product.Flags?.map((flag: FlagItem) => {
          const flagCode = flagMapping[flag.Country]?.toLowerCase() || 'unknown';
          return (
            <div key={flag.Country} className="flag-item" title={flag.Country}>
              <Image
                src={`https://flagcdn.com/w20/${flagCode}.png`}
                alt={`${flag.Country} flag`}
                width={20}
                height={15}
                className="flag-image"
                unoptimized
              />
            </div>
          );
        })}
        {!product.Flags?.length && origin && (
          <div className="flag-item" title={origin}>
            <Image
              src={`https://flagcdn.com/w20/${iso?.toLowerCase()}.png`}
              alt={`${origin} flag`}
              width={20}
              height={15}
              className="flag-image"
              unoptimized
            />
          </div>
        )}
      </div>

      {/* Category */}
      <div className="cell left header-categorie">
        <div className="category-block">
          <p className="category">{product["Product Category"]}</p>
          <p className="subcategory">{product.Subcategory}</p>
        </div>
      </div>

      {/* Order Amount */}
      <div className="cell header-bestel">
        <div className="quantity-controls">
          <button type="button" className="quantity-button" onClick={handleDecrement}>−</button>
          <input
            type="number"
            className="quantity-input"
            placeholder={t("priceList.quantityPlaceholder", { defaultValue: "quantity" })}
            value={localQty}
            onChange={handleQtyChange}
            disabled={usePallet}
          />
          <button type="button" className="quantity-button" onClick={handleIncrement}>+</button>
        </div>
      </div>

      {/* Packaging */}
      <div className="cell left header-verpakking">
        <div className="packaging-block">
          <p
            className="packaging-main"
            dangerouslySetInnerHTML={{
              __html: product?.Colli && typeof product.Colli === 'string'
                ? (product.Colli.includes("@")
                  ? product.Colli.replace("@", "@<br/>")
                  : product.Colli)
                : "",
            }}
          ></p>
        </div>
      </div>

      {/* Price per Packaging */}
      <div className="cell right header-prijs-verpakking">
        <div className="price-block">
          <div className="price-container">
            <div className="price-line">
              {discount > 0 ? (
                <>
                  <span className="old-price">€ {unitPrice.toFixed(2)}</span>
                  <span className="new-price">€ {displayPrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="price-value">€ {unitPrice.toFixed(2)}</span>
              )}
            </div>
            <span className="subtext price-unit">{product["Price Unit"]}</span>
          </div>
        </div>
      </div>

      {/* #/Pallet + Checkbox */}
      <div className="cell right header-palletaantal">
        <div className="pallet-block">
          <div className="pallet-top-row">
            <span className="pallet-value">{colliPerPallet}</span>&nbsp;
            <label className="pallet-label">
              <input
                type="checkbox"
                checked={usePallet}
                onChange={handleUsePalletChange}
              />
            </label>
          </div>
          {discount > 0 && (
            <div className="discount-info-wrapper">
              <div
                className="discount-info"
                title={t("priceList.discountTooltip", {
                  defaultValue: "We reduce logistics costs when you order exact pallet quantities—and you benefit from that saving.",
                })}
              >
                − {discount}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Volume & Weight */}
      <div className="cell right header-volume-en-gewicht">
        <div className="volume-weight">
          <span className="volume">{product.M3} m³</span>
          <span className="weight">{product.Weight_KG} kg</span>
        </div>
      </div>
    </div>
  );
};

export default PriceListRow; 