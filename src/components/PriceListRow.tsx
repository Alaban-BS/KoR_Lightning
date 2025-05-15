import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Product, OrderLine } from "../types";
import { roundQtyToPallet } from "../components/priceListUtils";

interface PriceListRowProps {
  product: Product;
  orderLines: OrderLine[];
  setOrderLines: React.Dispatch<React.SetStateAction<OrderLine[]>>;
  flagMapping: Record<string, string>;
  palletCheckMap: Record<string, boolean>;
  setPalletCheckMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  style: React.CSSProperties;
  stockData: any[];
}

const PriceListRow: React.FC<PriceListRowProps> = ({
  product,
  orderLines,
  setOrderLines,
  flagMapping,
  palletCheckMap,
  setPalletCheckMap,
  style,
  stockData,
}) => {
  const { t } = useTranslation() as {
    t: (key: string, options?: any) => string;
  };
  const existingLine = orderLines.find((item) => item.SKU === product.SKU);
  const [localQty, setLocalQty] = useState<string>(
    existingLine ? existingLine.qty.toString() : "0"
  );
  const usePallet = palletCheckMap[product.SKU] ?? false;

  const setAndSaveQty = (newValue: number): void => {
    setLocalQty(newValue.toString());
    setOrderLines((prev) => {
      // Find the index of the existing line
      const existingIndex = prev.findIndex(line => line.SKU === product.SKU);
      
      if (existingIndex !== -1) {
        // If line exists, update it in place
        const newLines = [...prev];
        if (newValue > 0) {
          newLines[existingIndex] = { SKU: product.SKU, qty: newValue };
        } else {
          newLines.splice(existingIndex, 1);
        }
        return newLines;
      } else if (newValue > 0) {
        // If it's a new line, add it to the end
        return [...prev, { SKU: product.SKU, qty: newValue }];
      }
      
      return prev;
    });
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const typed = parseInt(e.target.value, 10) || 0;
    setAndSaveQty(typed);
  };

  const handleIncrement = (): void => {
    let current = parseInt(localQty, 10) || 0;
    const pallet = Number(product["Colli per pallet"]) || 1;
    setAndSaveQty(current + (usePallet ? pallet : 1));
  };

  const handleDecrement = (): void => {
    let current = parseInt(localQty, 10) || 0;
    if (current <= 0) return;
    const pallet = Number(product["Colli per pallet"]) || 1;
    setAndSaveQty(Math.max(0, current - (usePallet ? pallet : 1)));
  };

  const handleUsePalletChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newUsePallet = e.target.checked;
    setPalletCheckMap((prev) => ({ ...prev, [product.SKU]: newUsePallet }));
    if (newUsePallet) {
      const pallet = Number(product["Colli per pallet"]) || 0;
      const qtyNum = parseInt(localQty, 10) || 0;
      setAndSaveQty(roundQtyToPallet(qtyNum, pallet));
    }
  };

  const origin = product["Origin of product"];
  const iso = flagMapping[origin]?.toUpperCase();
  const flagUrl = iso ? `https://flagsapi.com/${iso}/flat/24.png` : undefined;
  const unitPrice = Number(product["Price unit price"]);
  const orderUnitPrice = Number(product["Order unit price"]);
  const discount = Number(product["Discount %"] || 0);
  const displayPrice =
    discount > 0 ? unitPrice * (1 - discount / 100) : unitPrice;
  const displayOrderPrice =
    discount > 0 ? orderUnitPrice * (1 - discount / 100) : orderUnitPrice;
  const colliPerPallet = Number(product["Colli per pallet"]) || 0;
  const stockItem = stockData.find((item: any) => item.SKU === product.SKU);
  const qtyAvailable = stockItem?.["Qty Available"] || 0;
  const leadTime = stockItem?.["Lead Time (days)"] || 0;
  let stockStatus =
    qtyAvailable === 0 ? (leadTime < 16 ? "orange" : "red") : "green";

  return (
    <div className="table-row" style={style}>
      {/* PRODUCT NAME & SKU */}
      <div className="cell left header-product">
        <div className="product-info">
          <span className="product-name">{product.Name}</span>
          <span className="sku-badge">{product.SKU}</span>
        </div>
      </div>

      {/* PRICE */}
      <div className="cell right header-prijs">
        <div className="price-block">
          <div className="price-container">
            <div className="price-line">
              {discount > 0 ? (
                <>
                  <span className="old-price">
                    € {orderUnitPrice.toFixed(2)}
                  </span>
                  <span className="new-price">
                    € {displayOrderPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="price-value">
                  € {orderUnitPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="subtext order-unit">{product["order unit"]}</span>
          </div>
        </div>
      </div>

      {/* STOCK STATUS */}
      <div className="cell header-stock">
        <span
          className={`stock-circle ${stockStatus}`}
          title={`${t("priceList.header.stock", {
            defaultValue: "Stock",
          })}: ${qtyAvailable}, ${t("priceList.header.leadTime", {
            defaultValue: "Lead time",
          })}: ${leadTime} ${t("priceList.header.days", {
            defaultValue: "days",
          })}`}
        ></span>
      </div>

      {/* ORIGIN / FLAG */}
      <div className="cell header-herkomst">
        {flagUrl ? (
          <img src={flagUrl} alt={origin} title={origin} className="flag-img" />
        ) : (
          origin
        )}
      </div>

      {/* CATEGORY */}
      <div className="cell left header-categorie">
        <div className="category-block">
          <p className="category">{product["Product Category"]}</p>
          <p className="subcategory">{product.Subcategory}</p>
        </div>
      </div>

      {/* ORDER AMOUNT */}
      <div className="cell header-bestel">
        <div className="quantity-controls">
          <button
            type="button"
            className="quantity-button"
            onClick={handleDecrement}
          >
            −
          </button>
          <input
            type="number"
            className="quantity-input"
            placeholder={t("priceList.quantityPlaceholder", {
              defaultValue: "quantity",
            })}
            value={localQty}
            onChange={handleQtyChange}
            disabled={usePallet}
          />
          <button
            type="button"
            className="quantity-button"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </div>

      {/* PACKAGING */}
      <div className="cell left header-verpakking">
        <div className="packaging-block">
          <p
            className="packaging-main"
            dangerouslySetInnerHTML={{
              __html: product.Colli.includes("@")
                ? product.Colli.replace("@", "@<br/>")
                : product.Colli,
            }}
          ></p>
        </div>
      </div>

      {/* PRICE PER PACKAGING */}
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

      {/* #/PALLET + CHECKBOX */}
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
                  defaultValue:
                    "We reduce logistics costs when you order exact pallet quantities—and you benefit from that saving.",
                })}
              >
                − {discount}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VOLUME & WEIGHT */}
      <div className="cell right header-volume-en-gewicht">
        <div className="volume-block">
          <p className="volume">
            {product.M3} {t("priceList.volumeUnit", { defaultValue: "m³" })}
          </p>
          <span className="subtext weight">
            {product.Weight_KG} {t("priceList.weightUnit", { defaultValue: "kg" })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceListRow; 