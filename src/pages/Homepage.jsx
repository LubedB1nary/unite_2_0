import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { PartnerMarquee } from '../components/shared/PartnerMarquee.jsx';
import { cartStore } from '../store/cart.js';
import { PRODUCTS, SEGMENTS, TRUST_METRICS } from '../data/index.js';
import { useViewport } from '../lib/viewport.js';

function Hero() {
  const navigate = useNavigate();
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  return (
    <section
      id="main"
      style={{ background: D.paper, position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ padding: `${isMobile ? 36 : 80}px ${padX}px ${isMobile ? 32 : 48}px` }}>
        <div className="um-fade-up" style={{
          maxWidth: 1360, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.15fr 1fr',
          gap: isMobile ? 32 : 64,
          alignItems: isMobile ? 'start' : 'end',
        }}>
          <div>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: isMobile ? 18 : 28, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: D.plum, flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>FDA-REGISTERED · VETERAN-OWNED · EST. 2018</span>
            </div>
            <h1 style={{
              fontFamily: D.display, fontWeight: 400,
              fontSize: 'clamp(44px, 11vw, 104px)',
              lineHeight: 0.94,
              letterSpacing: 'clamp(-1.1px, -0.27vw, -2.6px)',
              color: D.ink, margin: 0,
            }}>
              The supply chain <Grad>behind</Grad><br />American medicine.
            </h1>
            <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.55, color: D.ink2, maxWidth: 540, marginTop: isMobile ? 18 : 28 }}>
              We import, warehouse, and distribute for the people who keep the OR running — surgery centers, pharmacies, first responders, the VA. No minimum orders. Landed cost, transparent.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: isMobile ? 24 : 36, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/catalog')} style={{ background: D.plum, color: D.paper, border: 'none', padding: isMobile ? '14px 22px' : '15px 24px', borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: D.sans, display: 'flex', alignItems: 'center', gap: 10, flex: isMobile ? '1 1 200px' : '0 0 auto', justifyContent: 'center' }}>
                Get pricing <Icon.arrow />
              </button>
              <button onClick={() => navigate('/quote')} style={{ background: 'transparent', color: D.ink, border: `1.5px solid ${D.ink}`, padding: isMobile ? '14px 22px' : '15px 24px', borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: D.sans, flex: isMobile ? '1 1 200px' : '0 0 auto' }}>
                Quote a non-stocked item
              </button>
            </div>
          </div>
          <div style={{ position: 'relative', marginTop: isMobile ? 0 : 0 }}>
            <PhotoPlaceholder
              caption="warehouse floor, golden hour"
              height={isMobile ? 280 : 500}
              stripeFrom="#e8ddcd" stripeTo="#d9c8b0" textColor={D.plum}
            />
            <div style={{
              position: 'absolute',
              left: isMobile ? 12 : -32,
              bottom: isMobile ? 12 : 40,
              background: D.paper, border: `1px solid ${D.line}`,
              padding: isMobile ? 16 : 22, width: isMobile ? 240 : 300,
              boxShadow: '0 20px 40px -20px rgba(36,26,40,.25)',
            }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>LIVE INVENTORY</div>
              <div style={{ fontFamily: D.display, fontSize: isMobile ? 32 : 44, lineHeight: 1, color: D.ink, marginTop: 8, letterSpacing: -0.8 }}>1.24M <span style={{ fontSize: isMobile ? 13 : 15, fontFamily: D.sans, color: D.ink2, letterSpacing: 0 }}>units</span></div>
              <div style={{ fontSize: 12, color: D.ink2, marginTop: 6 }}>across Atlanta, Reno, Dallas</div>
            </div>
          </div>
        </div>
      </div>
      <PartnerMarquee />
    </section>
  );
}

function Metrics() {
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  return (
    <div style={{ background: D.paper, padding: `${isMobile ? 56 : 88}px ${padX}px`, borderBottom: `1px solid ${D.line}` }}>
      <div style={{
        maxWidth: 1360, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr',
        gap: isMobile ? 32 : 80,
      }}>
        <div>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 20 }}>BY THE NUMBERS</div>
          <h2 style={{ fontFamily: D.display, fontSize: 'clamp(34px, 6vw, 56px)', fontWeight: 400, color: D.ink, letterSpacing: 'clamp(-0.7px, -0.13vw, -1.2px)', lineHeight: 1.02, margin: 0 }}>
            Not the biggest.<br />Built for the ones <Grad>Big 3</Grad> can&apos;t serve.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? '24px 18px' : '32px 48px' }}>
          {TRUST_METRICS.map((t, i) => (
            <div key={i} style={{ borderTop: `2px solid ${D.plum}`, paddingTop: 16 }}>
              <div style={{
                fontFamily: D.display,
                fontSize: 'clamp(28px, 5.6vw, 54px)',
                letterSpacing: -1, color: D.ink, lineHeight: 0.95,
                wordBreak: 'break-word',
              }}>{t.big}</div>
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
  const { isMobile } = useViewport();
  const [active, setActive] = useState('asc');
  const seg = SEGMENTS.find((s) => s.id === active);
  const segRoutes = { asc: '/segments/asc', gov: '/segments/gov', pharma: '/segments/pharmacy', dist: '/segments/distributors' };
  const padX = isMobile ? 20 : 40;
  return (
    <div style={{ background: D.plum, color: D.paper, padding: `${isMobile ? 56 : 96}px ${padX}px` }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plumSoft, marginBottom: 16 }}>FIND YOUR LANE</div>
        <h2 style={{ fontFamily: D.display, fontSize: 'clamp(36px, 7.2vw, 72px)', fontWeight: 400, letterSpacing: 'clamp(-0.9px, -0.19vw, -1.8px)', lineHeight: 1.0, margin: 0, maxWidth: 900 }}>
          Tell us who you are.<br />We&apos;ll show you <em>your</em> catalog.
        </h2>
        <div style={{
          marginTop: isMobile ? 32 : 56,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '320px 1fr',
          gap: isMobile ? 20 : 40,
          alignItems: 'start',
        }}>
          <div style={{ display: isMobile ? 'grid' : 'block', gridTemplateColumns: isMobile ? '1fr 1fr' : undefined, gap: isMobile ? 8 : 0 }}>
            {SEGMENTS.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: active === s.id ? D.paper : 'transparent',
                color: active === s.id ? D.ink : D.paper,
                border: 'none', padding: '14px 16px', marginBottom: isMobile ? 0 : 8,
                borderRadius: 10, fontFamily: D.sans, cursor: 'pointer',
              }}>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, opacity: .6 }}>{s.tam} TAM</div>
                <div style={{ fontFamily: D.display, fontSize: isMobile ? 18 : 22, fontWeight: 400, letterSpacing: -0.3, marginTop: 4, lineHeight: 1.1 }}>{s.title}</div>
              </button>
            ))}
          </div>
          <div style={{ background: D.paper, color: D.ink, padding: isMobile ? 24 : 40, borderRadius: 12, minHeight: isMobile ? 0 : 380 }}>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.2, color: D.plum, marginBottom: 14 }}>FOR {seg.title.toUpperCase()}</div>
            <div style={{ fontFamily: D.display, fontSize: isMobile ? 26 : 40, letterSpacing: -0.6, lineHeight: 1.1 }}>{seg.line}</div>
            <div style={{ marginTop: isMobile ? 22 : 32, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: isMobile ? 14 : 20 }}>
              {[['No MOQ floor', 'Order one unit.'], ['48-hr median ship', 'From 3 US warehouses.'], ['Dedicated rep', 'Not a call center.']].map(([t, s]) => (
                <div key={t} style={{ borderLeft: `2px solid ${D.plum}`, paddingLeft: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: 13, color: D.ink2, marginTop: 4 }}>{s}</div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate(segRoutes[active])} style={{ marginTop: isMobile ? 24 : 36, background: D.ink, color: D.paper, border: 'none', padding: '14px 22px', borderRadius: 999, cursor: 'pointer', fontFamily: D.sans, fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
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
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  const picks = PRODUCTS.slice(0, 4);
  return (
    <div style={{ padding: `${isMobile ? 56 : 96}px ${padX}px`, background: D.paperAlt, borderTop: `1px solid ${D.line}` }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'end', marginBottom: isMobile ? 24 : 36, flexDirection: isMobile ? 'column' : 'row', gap: 14 }}>
          <h2 style={{ fontFamily: D.display, fontSize: 'clamp(34px, 6vw, 56px)', fontWeight: 400, letterSpacing: 'clamp(-0.7px, -0.13vw, -1.2px)', color: D.ink, margin: 0, lineHeight: 1.02 }}>
            In stock, <Grad>shipping today</Grad>.
          </h2>
          <button onClick={() => navigate('/catalog')} style={{ color: D.ink, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: D.sans, padding: 0 }}>
            See all 12,400 SKUs <Icon.arrow />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: isMobile ? 12 : 18 }}>
          {picks.map((p) => (
            <article key={p.sku} style={{ background: D.card, borderRadius: 14, overflow: 'hidden', border: `1px solid ${D.line}` }}>
              <PhotoPlaceholder caption={p.img} height={isMobile ? 140 : 210} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} />
              <div style={{ padding: isMobile ? 14 : 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: D.mono, fontSize: 10, letterSpacing: 0.8, color: D.ink3 }}>
                  <span>{p.sku}</span>
                  <span style={{ display: isMobile ? 'none' : 'inline' }}>HCPCS {p.hcpcs}</span>
                </div>
                <div style={{ fontFamily: D.display, fontSize: isMobile ? 16 : 19, color: D.ink, marginTop: 10, lineHeight: 1.25, minHeight: isMobile ? 40 : 48 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: D.ink2, marginTop: 4 }}>{p.cat} · {p.packSize}</div>
                <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginTop: 14 }}>
                  <div>
                    <div style={{ fontFamily: D.display, fontSize: isMobile ? 20 : 24, color: D.plum, letterSpacing: -0.4 }}>${p.price.toFixed(2)}</div>
                    <div style={{ fontFamily: D.mono, fontSize: 10, color: D.ink3 }}>MOQ {p.moq}</div>
                  </div>
                  <button onClick={() => cartStore.add(p.sku)} aria-label={`Add ${p.name}`} style={{ background: D.ink, color: D.paper, border: 'none', width: 40, height: 40, borderRadius: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon.plus />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTA() {
  const navigate = useNavigate();
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  return (
    <div style={{ padding: `${isMobile ? 72 : 120}px ${padX}px`, background: D.ink, color: D.paper }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 28 : 72, alignItems: 'center' }}>
        <h2 style={{ fontFamily: D.display, fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 400, letterSpacing: 'clamp(-1px, -0.19vw, -1.8px)', lineHeight: 1.0, margin: 0 }}>
          Enter data once.<br />
          <Grad>Sync everything.</Grad>
        </h2>
        <div>
          <div style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.55, color: '#cfc4d2', marginBottom: isMobile ? 22 : 28 }}>
            Order placed → inventory updates → invoice auto-creates → label prints → tracking returns to your portal. Zero human touchpoints. That&apos;s the product.
          </div>
          <button onClick={() => navigate('/quote')} style={{ background: D.plum, color: D.paper, border: 'none', padding: '14px 24px', borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: D.sans, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
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
      <Metrics />
      <SegmentRouter />
      <Featured />
      <CTA />
      <Footer />
    </div>
  );
}
