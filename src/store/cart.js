/**
 * Cart store backed by the in-browser DB so the cart survives refreshes
 * and matches the schema in the brief (carts, cart_items).
 *
 * For the demo we operate on a single cart_id ('cart_demo' or one created
 * for the logged-in user). When the user logs in we adopt their cart.
 */

import { useEffect, useSyncExternalStore } from 'react';
import { db } from '../lib/db.js';
import { auth } from '../lib/auth.js';
import { uid } from '../lib/format.js';

const subs = new Set();
let activeCartId = 'cart_demo';

function notify() { subs.forEach((fn) => fn()); }

function ensureCartFor(user) {
  const userId = user?.user_id || null;
  if (!userId) return 'cart_demo';
  let cart = db.list('carts', { where: { customer_id: userId } })[0];
  if (!cart) cart = db.insert('carts', { id: uid('cart'), customer_id: userId, org_id: user.org_id || null });
  return cart.id;
}

function reseat() {
  activeCartId = ensureCartFor(auth.current());
  notify();
}

reseat();

export const cartStore = {
  cartId: () => activeCartId,
  reseatForUser: () => reseat(),

  get items() {
    return db.list('cart_items', { where: { cart_id: activeCartId } });
  },

  add(sku, qty = 1) {
    const product = db.get('products', sku);
    if (!product) return;
    const existing = db.list('cart_items', { where: { cart_id: activeCartId, sku } })[0];
    if (existing) {
      db.update('cart_items', existing.id, { qty: existing.qty + qty });
    } else {
      db.insert('cart_items', { id: uid('ci'), cart_id: activeCartId, sku, qty, unit_price: product.price, name: product.name });
    }
    notify();
  },

  setQty(sku, qty) {
    const existing = db.list('cart_items', { where: { cart_id: activeCartId, sku } })[0];
    if (!existing) return;
    if (qty <= 0) db.remove('cart_items', existing.id);
    else db.update('cart_items', existing.id, { qty: Math.max(1, qty) });
    notify();
  },

  remove(sku) {
    const existing = db.list('cart_items', { where: { cart_id: activeCartId, sku } })[0];
    if (existing) db.remove('cart_items', existing.id);
    notify();
  },

  clear() {
    db.list('cart_items', { where: { cart_id: activeCartId } }).forEach((ci) => db.remove('cart_items', ci.id));
    notify();
  },

  subscribe(fn) {
    subs.add(fn);
    const off = db.subscribe('cart_items', notify);
    return () => { subs.delete(fn); off(); };
  },
};

/** Reactive React hook (drop-in for old useCart()). */
export function useCart() {
  const subscribe = (cb) => cartStore.subscribe(cb);
  const items = cartStore.items;
  const getSnapshot = () => `${activeCartId}:${items.length}:${items.reduce((a, b) => a + b.qty, 0)}`;
  useSyncExternalStore(subscribe, getSnapshot);
  const it = cartStore.items;
  return {
    items: it,
    subtotal: +it.reduce((a, b) => a + b.qty * b.unit_price, 0).toFixed(2),
    count: it.reduce((a, b) => a + b.qty, 0),
  };
}

/** Re-seat the cart whenever the auth session changes. */
export function useCartAuthSync() {
  const session = auth.use();
  useEffect(() => { reseat(); }, [session?.user_id]);
}
