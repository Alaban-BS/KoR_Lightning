// src/types.ts

export interface Product {
  SKU: string;
  Name: string;
  Description?: string;
  "Product Category": string;
  Subcategory?: string;
  Colli: string;
  "Price unit price": string | number;
  "Price Unit": string;
  "Currency (Code)": string;
  "Order unit price": string;
  "order unit": string;
  "Discount %": string;
  "Colli per pallet": string;
  "Colli discount": string;
  "Origin of product": string;
  M3: string;
  Weight_KG: string;
  Flags?: FlagItem[];
  // add other fields if needed
}

export interface OrderLine {
  SKU: string;
  qty: number;
}

export interface FlagItem {
  Country: string;
  // Add other flag-related properties if needed
}
