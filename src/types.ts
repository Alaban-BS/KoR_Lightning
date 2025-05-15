// src/types.ts

export interface Product {
  SKU: string;
  Name: string;
  "Product Category": string;
  Subcategory?: string;
  Colli: string;
  "Price unit price": string | number;
  "Price Unit": string;
  "Currency (Code)": string;
  "Order unit price": string | number;
  "order unit": string;
  "Discount %": number | string;
  "Colli per pallet"?: number | string;
  "Colli discount"?: number | string;
  "Origin of product": string;
  M3: number | string;
  Weight_KG: number | string;
  // add other fields if needed
}

export interface OrderLine {
  SKU: string;
  qty: number;
}

export interface FlagItem {
  origin: string;
  iso: string;
}
