import { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/index.js';

export const cartStore = (() => {
  let state = { items: [] };
  const subs = new Set();
  const emit = () => subs.forEach((s) => s(state));
  return {
    get: () => state,
    subscribe: (fn) => { subs.add(fn); return () => subs.delete(fn); },
    add: (sku, qty = 1) => {
      const p = PRODUCTS.find((x) => x.sku === sku);
      if (!p) return;
      const i = state.items.findIndex((x) => x.sku === sku);
      const items = i >= 0
        ? state.items.map((x, idx) => idx === i ? { ...x, qty: x.qty + qty } : x)
        : [...state.items, { sku, qty, price: p.price, name: p.name }];
      state = { items };
      emit();
    },
    remove: (sku) => { state = { items: state.items.filter((x) => x.sku !== sku) }; emit(); },
    setQty: (sku, qty) => { state = { items: state.items.map((x) => x.sku === sku ? { ...x, qty: Math.max(1, qty) } : x) }; emit(); },
    clear: () => { state = { items: [] }; emit(); },
  };
})();

export function useCart() {
  const [s, setS] = useState(cartStore.get());
  useEffect(() => cartStore.subscribe(setS), []);
  return s;
}
