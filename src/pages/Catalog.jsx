import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { cartStore } from '../store/cart.js';
import { PRODUCTS } from '../data/index.js';

export function Catalog() {
  const [cat, setCat] = useState('All');
  const [tier, setTier] = useState(new Set());
  const cats = ['All', ...new Set(PRODUCTS.map((p) => p.cat))];
  const tiers = [...new Set(PRODUCTS.map((p) => p.tier))];
  const filtered = PRODUCTS.filter((p) => (cat === 'All' || p.cat === cat) && (tier.size === 0 || tier.has(p.tier)));
  const toggle = (t) => { const n = new Set(tier); n.has(t) ? n.delete(t) : n.add(t); setTier(n); };

  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <div style={{ background: D.paperAlt, padding: '48px 40px', borderBottom: `1px solid ${D.line}` }}>
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.2, color: D.plum }}>CATALOG · 12,400 SKUS</div>
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginTop: 10 }}>
            <h1 style={{ fontFamily: D.display, fontSize: 72, fontWeight: 400, letterSpacing: -1.8, margin: 0, lineHeight: 1 }}>
              {cat === 'All' ? <>Everything <Grad>in stock</Grad></> : cat}
            </h1>
            <div style={{ fontFamily: D.mono, fontSize: 12, color: D.ink2 }}>{filtered.length} results · updated 04 min ago</div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat === c ? D.plum : D.card, color: cat === c ? D.paper : D.ink2,
                border: `1px solid ${cat === c ? D.plum : D.line}`,
                padding: '8px 14px', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontFamily: D.sans,
              }}>{c}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '32px 40px 80px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40 }}>
        <div>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.ink3, marginBottom: 14 }}>TIER</div>
          {tiers.map((t) => (
            <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 14, color: D.ink2, cursor: 'pointer' }}>
              <input type="checkbox" checked={tier.has(t)} onChange={() => toggle(t)} style={{ accentColor: D.plum }} /> {t}
            </label>
          ))}
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.ink3, margin: '28px 0 14px' }}>COMPLIANCE</div>
          {['PDAC-approved', 'Berry compliant', 'TAA compliant', 'MSPV listed'].map((c) => (
            <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 14, color: D.ink2, cursor: 'pointer' }}>
              <input type="checkbox" style={{ accentColor: D.plum }} /> {c}
            </label>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {filtered.map((p) => (
            <div key={p.sku} style={{ background: D.card, borderRadius: 14, overflow: 'hidden', border: `1px solid ${D.line}` }}>
              <PhotoPlaceholder caption={p.img} height={210} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} />
              <div style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: D.mono, fontSize: 10, letterSpacing: 0.8, color: D.ink3 }}>
                  <span>{p.sku}</span>
                  <span style={{ color: p.stock > 500 ? '#3b8760' : D.terra }}><Icon.dot /> {p.stock > 500 ? 'IN STOCK' : 'LOW'}</span>
                </div>
                <div style={{ fontFamily: D.display, fontSize: 19, color: D.ink, marginTop: 10, lineHeight: 1.25, minHeight: 46 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: D.ink2, marginTop: 4 }}>{p.cat} · HCPCS {p.hcpcs}</div>
                <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginTop: 16 }}>
                  <div>
                    <div style={{ fontFamily: D.display, fontSize: 24, color: D.plum, letterSpacing: -0.4 }}>${p.price.toFixed(2)}</div>
                    <div style={{ fontFamily: D.mono, fontSize: 10, color: D.ink3 }}>{p.packSize} · MOQ {p.moq}</div>
                  </div>
                  <button onClick={() => cartStore.add(p.sku)} style={{ background: D.ink, color: D.paper, border: 'none', width: 40, height: 40, borderRadius: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon.plus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
