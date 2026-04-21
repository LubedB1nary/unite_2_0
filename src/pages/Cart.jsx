import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { useCart, cartStore } from '../store/cart.js';
import { db } from '../lib/db.js';
import { fmt } from '../lib/format.js';

function tierLabel(qty) {
  if (qty >= 250) return '250+';
  if (qty >= 50) return '50-249';
  return '1-49';
}

export function Cart() {
  const navigate = useNavigate();
  const cart = useCart();
  const items = cart.items;
  const subtotal = cart.subtotal;
  const freight = subtotal > 500 ? 0 : 42;
  const total = +(subtotal + freight).toFixed(2);
  const totalQty = cart.count;
  const suggestions = db.useTable('products', { limit: 8 }).filter((p) => !items.find((i) => i.sku === p.sku)).slice(0, 3);

  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <main id="main" style={{ background: D.paperAlt, padding: '52px 40px', borderBottom: `1px solid ${D.line}` }}>
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.2, color: D.plum }}>CART · {items.length} LINE ITEMS · {totalQty} UNITS</div>
          <h1 style={{ fontFamily: D.display, fontSize: 72, fontWeight: 400, letterSpacing: -1.8, margin: '10px 0 0', lineHeight: 1 }}>
            Your <Grad>next order</Grad>.
          </h1>
        </div>
      </main>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '44px 40px 80px', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 36 }}>
        <div>
          {items.length === 0 && (
            <div style={{ background: D.card, border: `1px dashed ${D.line}`, borderRadius: 14, padding: 48, textAlign: 'center' }}>
              <div style={{ fontFamily: D.display, fontSize: 28, letterSpacing: -0.4 }}>Your cart is empty.</div>
              <p style={{ color: D.ink2, marginTop: 10 }}>Browse 12,400 SKUs and add the ones you need to your next order.</p>
              <button onClick={() => navigate('/catalog')} style={{ marginTop: 14, background: D.plum, color: D.paper, border: 'none', padding: '12px 22px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>Open the catalog</button>
            </div>
          )}
          {items.length > 0 && (
            <div style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
              {items.map((it, i) => (
                <div key={it.id} style={{ padding: 20, borderTop: i === 0 ? 'none' : `1px solid ${D.line}`, display: 'grid', gridTemplateColumns: '88px 1fr auto auto auto', gap: 20, alignItems: 'center' }}>
                  <div style={{ width: 88, height: 88, borderRadius: 8, background: 'repeating-linear-gradient(135deg,#ebe3d3 0 10px,#ddd1b7 10px 20px)' }} />
                  <div>
                    <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 0.8, color: D.ink3 }}>{it.sku}</div>
                    <div style={{ fontFamily: D.display, fontSize: 18, marginTop: 6, lineHeight: 1.2 }}>{it.name}</div>
                    <div style={{ fontSize: 12, color: D.ink2, marginTop: 4 }}>Ships from Atlanta · Net 30 eligible · tier {tierLabel(it.qty)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2, border: `1px solid ${D.line}`, borderRadius: 999, padding: 2 }}>
                    <button aria-label={`Decrease ${it.name}`} onClick={() => cartStore.setQty(it.sku, it.qty - 1)} style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer' }}><Icon.minus /></button>
                    <div style={{ minWidth: 36, textAlign: 'center', fontWeight: 600, fontSize: 13 }}>{it.qty}</div>
                    <button aria-label={`Increase ${it.name}`} onClick={() => cartStore.setQty(it.sku, it.qty + 1)} style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer' }}><Icon.plus /></button>
                  </div>
                  <div style={{ fontFamily: D.display, fontSize: 22, color: D.plum, letterSpacing: -0.3, minWidth: 100, textAlign: 'right' }}>{fmt.money(it.qty * it.unit_price)}</div>
                  <button aria-label={`Remove ${it.name}`} onClick={() => cartStore.remove(it.sku)} style={{ background: 'none', border: 'none', color: D.ink3, cursor: 'pointer', padding: 8 }}><Icon.close /></button>
                </div>
              ))}
            </div>
          )}
          {suggestions.length > 0 && (
            <div style={{ marginTop: 24, padding: 22, border: `1px dashed ${D.line}`, borderRadius: 14, background: D.card }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum, marginBottom: 10 }}>REORDER SUGGESTIONS · FROM YOUR LAST 90 DAYS</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                {suggestions.map((p) => (
                  <div key={p.sku} style={{ padding: 14, background: D.paper, borderRadius: 10, border: `1px solid ${D.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name.split('·')[0].trim()}</div>
                      <div style={{ fontSize: 11, color: D.ink3, fontFamily: D.mono, marginTop: 4 }}>{p.sku} · {fmt.money(p.price)}</div>
                    </div>
                    <button aria-label={`Add ${p.name}`} onClick={() => cartStore.add(p.sku)} style={{ background: D.plum, color: D.paper, border: 'none', width: 30, height: 30, borderRadius: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.plus /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <div style={{ position: 'sticky', top: 120 }}>
            <div style={{ background: D.plum, color: D.paper, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.plumSoft }}>ORDER SUMMARY</div>
              <div style={{ marginTop: 20, display: 'grid', gap: 10, fontSize: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: D.plumSoft }}>Subtotal</span><span>{fmt.money(subtotal)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: D.plumSoft }}>Freight</span><span>{freight === 0 ? 'Free' : fmt.money(freight)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: D.plumSoft }}>Volume tier</span><span>{tierLabel(totalQty)}</span></div>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,.18)', margin: '22px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div style={{ fontFamily: D.mono, fontSize: 11, color: D.plumSoft }}>TOTAL DUE</div>
                <div style={{ fontFamily: D.display, fontSize: 44, letterSpacing: -1 }}>{fmt.money(total)}</div>
              </div>
              <button disabled={items.length === 0} onClick={() => navigate('/checkout')} style={{ marginTop: 22, width: '100%', background: D.paper, color: D.plum, border: 'none', padding: 14, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: items.length === 0 ? 'not-allowed' : 'pointer', opacity: items.length === 0 ? 0.5 : 1 }}>Continue to checkout</button>
              <div style={{ marginTop: 14, fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plumSoft, textAlign: 'center' }}>NET 30 · NET 60 · ACH · WIRE · CC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
