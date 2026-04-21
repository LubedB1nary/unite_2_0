import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { cartStore } from '../store/cart.js';
import { PRODUCTS } from '../data/index.js';

export function ProductDetail() {
  const p = PRODUCTS[0];
  const [qty, setQty] = useState(1);
  const [tier, setTier] = useState('50-249');
  const tiers = [{ range: '1-9', price: 89.40 }, { range: '10-49', price: 82.10 }, { range: '50-249', price: 76.50 }, { range: '250+', price: 71.25 }];
  const active = tiers.find((t) => t.range === tier);
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <div style={{ padding: '16px 40px', background: D.paperAlt, borderBottom: `1px solid ${D.line}`, fontFamily: D.mono, fontSize: 11, letterSpacing: 0.8, color: D.ink3 }}>
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          Catalog / Orthotics / Bracing / <span style={{ color: D.ink }}>{p.name}</span>
        </div>
      </div>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '40px 40px 80px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 56 }}>
        <div>
          <PhotoPlaceholder caption={p.img} height={560} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 10 }}>
            {['front', 'back', 'hinge', 'packaging'].map((c, i) => (
              <PhotoPlaceholder key={i} caption={c} height={100} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} />
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum }}>{p.sku} · HCPCS {p.hcpcs} · PDAC APPROVED</div>
          <h1 style={{ fontFamily: D.display, fontSize: 48, fontWeight: 400, letterSpacing: -1, lineHeight: 1.05, margin: '14px 0 0' }}>{p.name}</h1>
          <div style={{ display: 'flex', gap: 4, marginTop: 14, alignItems: 'center', color: D.plum }}>
            {[0, 1, 2, 3, 4].map((i) => <Icon.star key={i} />)}
            <div style={{ fontSize: 13, color: D.ink2, marginLeft: 10 }}>4.8 · 142 reviews · used by 38 ASCs</div>
          </div>
          <div style={{ marginTop: 28, padding: 24, background: D.card, borderRadius: 14, border: `1px solid ${D.line}` }}>
            <div style={{ display: 'flex', alignItems: 'end', gap: 14 }}>
              <div style={{ fontFamily: D.display, fontSize: 56, color: D.plum, letterSpacing: -1, lineHeight: 1 }}>${active.price.toFixed(2)}</div>
              <div style={{ color: D.ink3, fontSize: 13, paddingBottom: 8 }}>per unit · volume tier {tier}</div>
            </div>
            <div style={{ marginTop: 20 }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginBottom: 10 }}>VOLUME TIER</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {tiers.map((t) => (
                  <button key={t.range} onClick={() => setTier(t.range)} style={{
                    flex: 1, padding: '12px 8px', borderRadius: 10,
                    background: tier === t.range ? D.plum : D.paper,
                    color: tier === t.range ? D.paper : D.ink,
                    border: `1px solid ${tier === t.range ? D.plum : D.line}`,
                    cursor: 'pointer', fontFamily: D.sans,
                  }}>
                    <div style={{ fontSize: 12, opacity: .7 }}>{t.range}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>${t.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 22, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, border: `1px solid ${D.line}`, borderRadius: 999, padding: 4 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer' }}><Icon.minus /></button>
                <div style={{ minWidth: 40, textAlign: 'center', fontWeight: 600 }}>{qty}</div>
                <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer' }}><Icon.plus /></button>
              </div>
              <button onClick={() => cartStore.add(p.sku)} style={{ flex: 1, background: D.ink, color: D.paper, border: 'none', padding: '14px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>Add to cart</button>
              <button style={{ background: 'transparent', color: D.ink, border: `1.5px solid ${D.ink}`, padding: '13px 18px', borderRadius: 999, cursor: 'pointer', fontSize: 14 }}>Request quote</button>
            </div>
          </div>
          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[['In stock', '482 Atlanta'], ['Ships today', 'if ordered 3PM ET'], ['Free freight', 'orders $500+']].map(([a, b], i) => (
              <div key={i} style={{ border: `1px solid ${D.line}`, padding: 14, borderRadius: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: D.ink }}>{a}</div>
                <div style={{ fontSize: 12, color: D.ink2, marginTop: 4 }}>{b}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <div style={{ fontFamily: D.display, fontSize: 22, marginBottom: 12 }}>Specifications</div>
            <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
              <tbody>
                {[['HCPCS', 'L1832'], ['PDAC approval', 'Yes — letter available'], ['Sizes', 'S, M, L, XL, XXL'], ['Materials', 'Aluminum + EVA foam'], ['Country of origin', 'USA — Georgia'], ['Case pack', '1 ea'], ['Shelf life', 'N/A']].map(([k, v], i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${D.line}` }}>
                    <td style={{ padding: '12px 0', color: D.ink2, width: '40%', fontFamily: D.mono, fontSize: 12, letterSpacing: 0.6 }}>{k.toUpperCase()}</td>
                    <td style={{ padding: '12px 0', color: D.ink, fontWeight: 500 }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
