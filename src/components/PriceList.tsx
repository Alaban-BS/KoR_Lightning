import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import "../styles/PriceList.css";
import { Product, OrderLine } from "../types";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import PriceListRow from "./PriceListRow";
import type { CSSProperties } from 'react';

interface StockItem {
  SKU: string;
  "Qty Available": number;
  "Lead Time (days)": number;
}

interface PriceListProps {
  productData: Product[];
  orderLines: OrderLine[];
  setOrderLines: Dispatch<SetStateAction<OrderLine[]>>;
  flagMapping: Record<string, string>;
  stockData: StockItem[];
}

const PriceList = ({
  productData,
  orderLines,
  setOrderLines,
  flagMapping,
  stockData,
}: PriceListProps) => {
  const { t } = useTranslation() as { t: TFunction };
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [palletCheckMap, setPalletCheckMap] = useState<Record<string, boolean>>({});

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const filteredData = productData.filter(
    (product) =>
      product.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.SKU.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Row = ({ index, style }: ListChildComponentProps) => {
    const product = filteredData[index];
    return (
      <PriceListRow
        product={product}
        orderLines={orderLines}
        setOrderLines={setOrderLines}
        flagMapping={flagMapping}
        palletCheckMap={palletCheckMap}
        setPalletCheckMap={setPalletCheckMap}
        style={style as CSSProperties}
        stockData={stockData}
      />
    );
  };

  return (
    <div className="table-container">
      <h2 className="prijslijst-title">
        {t("priceList.title", { defaultValue: "Prijslijst" })}
      </h2>
      <div className="table-header header-cell">
        <div className="cell header-product">
          <input
            type="text"
            className="search-input"
            placeholder={t("priceList.searchPlaceholder", {
              defaultValue: "Zoek product...",
            })}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="cell header-prijs">
          {t("priceList.header.price", { defaultValue: "Prijs" })}
        </div>
        <div className="cell header-stock">
          {t("priceList.header.stock", { defaultValue: "Stk" })}
        </div>
        <div className="cell header-herkomst">
          {t("priceList.header.origin", { defaultValue: "Herkomst" })}
        </div>
        <div className="cell header-categorie">
          {t("priceList.header.category", { defaultValue: "Categorie" })}
        </div>
        <div className="cell header-bestel">
          {t("priceList.header.order", { defaultValue: "Bestel" })}
        </div>
        <div className="cell header-verpakking">
          {t("priceList.header.packaging", { defaultValue: "Verpakking" })}
        </div>
        <div className="cell header-prijs-verpakking">
          {t("priceList.header.pricePackaging", {
            defaultValue: "Prijs / Verpakking",
          })}
        </div>
        <div className="cell header-palletaantal">
          {t("priceList.header.pallet", { defaultValue: "# / Pallet" })}
        </div>
        <div className="cell header-volume-en-gewicht">
          <div className="multiline-header">
            <span>
              {t("priceList.header.volume", { defaultValue: "Volume" })}
            </span>
            <span>
              {t("priceList.header.weight", { defaultValue: "Gewicht" })}
            </span>
          </div>
        </div>
      </div>
      <List
        height={400}
        itemCount={filteredData.length}
        itemSize={90}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default PriceList;
