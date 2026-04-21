import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { UMLogo } from '../components/shared/Logo.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { useCart, cartStore } from '../store/cart.js';
import { PRODUCTS, SEGMENTS, TRUST_METRICS } from '../data/index.js';

function Hero() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '80px 40px 48px', background: D.paper, position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 64, alignItems: 'end' }}>
        <div>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: D.plum }} />
            FDA-REGISTERED · VETERAN-OWNED · EST. 2018
          </div>
          <h1 style={{ fontFamily: D.display, fontWeight: 400, fontSize: 104, lineHeight: 0.94, letterSpacing: -2.6, color: D.ink, margin: 0 }}>
            The supply chain <Grad>behind</Grad><br />American medicine.
          </h1>
          <div style={{ fontSize: 18, lineHeight: 1.55, color: D.ink2, maxWidth: 540, marginTop: 28 }}>
            We import, warehouse, and distribute for the people who keep the OR running — surgery centers, pharmacies, first responders, the VA. No minimum orders. Landed cost, transparent.
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
            <button onClick={() => navigate('/catalog')} style={{ background: D.plum, color: D.paper, border: 'none', padding: '15px 24px', borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: D.sans, display: 'flex', alignItems: 'center', gap: 10 }}>
              Get pricing <Icon.arrow />
            </button>
            <button onClick={() => navigate('/quote')} style={{ background: 'transparent', color: D.ink, border: `1.5px solid ${D.ink}`, padding: '15px 24px', borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: D.sans }}>
              Quote a non-stocked item
            </button>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <PhotoPlaceholder caption="warehouse floor, golden hour" height={500} stripeFrom="#e8ddcd" stripeTo="#d9c8b0" textColor={D.plum} />
          <div style={{ position: 'absolute', left: -32, bottom: 40, background: D.paper, border: `1px solid ${D.line}`, padding: 22, width: 300, boxShadow: '0 20px 40px -20px rgba(36,26,40,.25)' }}>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>LIVE INVENTORY</div>
            <div style={{ fontFamily: D.display, fontSize: 44, lineHeight: 1, color: D.ink, marginTop: 8, letterSpacing: -0.8 }}>1.24M <span style={{ fontSize: 15, fontFamily: D.sans, color: D.ink2, letterSpacing: 0 }}>units</span></div>
            <div style={{ fontSize: 12, color: D.ink2, marginTop: 6 }}>across Atlanta, Reno, Dallas</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  const partners = ['VA HEALTH', 'CVS', 'GOPUFF', 'AMAZON', 'PUBLIX', 'DEPT. OF VETERAN AFFAIRS', 'KAISER', 'ASCOA', 'SURGERY PARTNERS'];
  return (
    <div style={{ borderTop: `1px solid ${D.line}`, borderBottom: `1px solid ${D.line}`, background: D.paperAlt, padding: '22px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 80, whiteSpace: 'nowrap', fontFamily: D.mono, fontSize: 13, letterSpacing: 3, color: D.ink2 }}>
        {[...partners, ...partners].map((p, i) => <span key={i}>{p}</span>)}
      </div>
    </div>
  );
}

function Metrics() {
  return (
    <div style={{ background: D.paper, padding: '88px 40px', borderBottom: `1px solid ${D.line}` }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80 }}>
        <div>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 20 }}>BY THE NUMBERS</div>
          <h2 style={{ fontFamily: D.display, fontSize: 56, fontWeight: 400, color: D.ink, letterSpacing: -1.2, lineHeight: 1, margin: 0 }}>
            Not the biggest.<br />Built for the ones <Grad>Big 3</Grad> can't serve.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px' }}>
          {TRUST_METRICS.map((t, i) => (
            <div key={i} style={{ borderTop: `2px solid ${D.plum}`, paddingTop: 20 }}>
              <div style={{ fontFamily: D.display, fontSize: 54, letterSpacing: -1, color: D.ink, lineHeight: 0.95 }}>{t.big}</div>
              <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.ink3, marginTop: 10 }}>{t.small.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SegmentRouter() {
  const navigate = useNavigate();
  const [active, setActive] = useState('asc');
  const seg = SEGMENTS.find((s) => s.id === active);
  const segRoutes = { asc: '/segments/asc', gov: '/segments/gov', pharma: '/segments/pharmacy', dist: '/segments/distributors' };
  return (
    <div style={{ background: D.plum, color: D.paper, padding: '96px 40px' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plumSoft, marginBottom: 20 }}>FIND YOUR LANE</div>
        <h2 style={{ fontFamily: D.display, fontSize: 72, fontWeight: 400, letterSpacing: -1.8, lineHeight: 0.98, margin: 0, maxWidth: 900 }}>
          Tell us who you are.<br />We'll show you <em>your</em> catalog.
        </h2>
        <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '320px 1fr', gap: 40, alignItems: 'start' }}>
          <div>
            {SEGMENTS.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: active === s.id ? D.paper : 'transparent',
                color: active === s.id ? D.ink : D.paper,
                border: 'none', padding: '16px 20px', marginBottom: 8,
                borderRadius: 10, fontFamily: D.sans, cursor: 'pointer',
              }}>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, opacity: .6 }}>{s.tam} TAM</div>
                <div style={{ fontFamily: D.display, fontSize: 22, fontWeight: 400, letterSpacing: -0.3, marginTop: 4, lineHeight: 1.1 }}>{s.title}</div>
              </button>
            ))}
          </div>
          <div style={{ background: D.paper, color: D.ink, padding: 40, borderRadius: 12, minHeight: 380 }}>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.2, color: D.plum, marginBottom: 14 }}>FOR {seg.title.toUpperCase()}</div>
            <div style={{ fontFamily: D.display, fontSize: 40, letterSpacing: -0.8, lineHeight: 1.05 }}>{seg.line}</div>
            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
              {[['No MOQ floor', 'Order one unit.'], ['48-hr median ship', 'From 3 US warehouses.'], ['Dedicated rep', 'Not a call center.']].map(([t, s]) => (
                <div key={t} style={{ borderLeft: `2px solid ${D.plum}`, paddingLeft: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: 13, color: D.ink2, marginTop: 4 }}>{s}</div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate(segRoutes[active])} style={{ marginTop: 36, background: D.ink, color: D.paper, border: 'none', padding: '14px 24px', borderRadius: 999, cursor: 'pointer', fontFamily: D.sans, fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              Open the {seg.title} catalog <Icon.arrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Featured() {
  const navigate = useNavigate();
  const picks = PRODUCTS.slice(0, 4);
  return (
    <div style={{ padding: '96px 40px', background: D.paperAlt, borderTop: `1px solid ${D.line}` }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 36 }}>
          <h2 style={{ fontFamily: D.display, fontSize: 56, fontWeight: 400, letterSpacing: -1.2, color: D.ink, margin: 0, lineHeight: 1 }}>
            In stock, <Grad>shipping today</Grad>.
          </h2>
          <button onClick={() => navigate('/catalog')} style={{ color: D.ink, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: D.sans }}>
            See all 12,400 SKUs <Icon.arrow />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
          {picks.map((p) => (
            <div key={p.sku} style={{ background: D.card, borderRadius: 14, overflow: 'hidden', border: `1px solid ${D.line}` }}>
              <PhotoPlaceholder caption={p.img} height={210} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} />
              <div style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: D.mono, fontSize: 10, letterSpacing: 0.8, color: D.ink3 }}>
                  <span>{p.sku}</span>
                  <span>HCPCS {p.hcpcs}</span>
                </div>
                <div style={{ fontFamily: D.display, fontSize: 19, color: D.ink, marginTop: 10, lineHeight: 1.25, minHeight: 48 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: D.ink2, marginTop: 4 }}>{p.cat} · {p.packSize}</div>
                <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginTop: 16 }}>
                  <div>
                    <div style={{ fontFamily: D.display, fontSize: 24, color: D.plum, letterSpacing: -0.4 }}>${p.price.toFixed(2)}</div>
                    <div style={{ fontFamily: D.mono, fontSize: 10, color: D.ink3 }}>MOQ {p.moq}</div>
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
    </div>
  );
}

function CTA() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '120px 40px', background: D.ink, color: D.paper }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 72, alignItems: 'center' }}>
        <h2 style={{ fontFamily: D.display, fontSize: 72, fontWeight: 400, letterSpacing: -1.8, lineHeight: 1, margin: 0 }}>
          Enter data once.<br />
          <Grad>Sync everything.</Grad>
        </h2>
        <div>
          <div style={{ fontSize: 17, lineHeight: 1.55, color: '#cfc4d2', marginBottom: 28 }}>
            Order placed → inventory updates → invoice auto-creates → label prints → tracking returns to your portal. Zero human touchpoints. That's the product.
          </div>
          <button onClick={() => navigate('/quote')} style={{ background: D.plum, color: D.paper, border: 'none', padding: '16px 26px', borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: D.sans, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            Start a quote <Icon.arrow />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Homepage() {
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink }}>
      <Nav />
      <Hero />
      <Marquee />
      <Metrics />
      <SegmentRouter />
      <Featured />
      <CTA />
      <Footer />
    </div>
  );
}
