export function roundQtyToPallet(qty: number, pallet: number): number {
  if (pallet <= 0) return qty;
  if (qty < pallet) return pallet;
  const ratio = qty / pallet;
  const floorVal = Math.floor(ratio);
  const fraction = ratio - floorVal;
  if (fraction === 0) return qty;
  return fraction < 0.5 ? floorVal * pallet : (floorVal + 1) * pallet;
} 