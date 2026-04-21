import { useNavigate } from 'react-router-dom';
import { D } from '../../tokens.js';
import { Nav } from '../../components/layout/Nav.jsx';
import { Footer } from '../../components/layout/Footer.jsx';
import { PhotoPlaceholder } from '../../components/shared/PhotoPlaceholder.jsx';
import { Grad } from '../../components/shared/Grad.jsx';
import { useViewport } from '../../lib/viewport.js';

export function SegmentASC() {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useViewport();
  const padX = isMobile ? 20 : 40;
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <div style={{ padding: `${isMobile ? 40 : 72}px ${padX}px ${isMobile ? 24 : 32}px`, background: D.paper }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: isMobile ? 22 : 64, alignItems: isMobile ? 'start' : 'end' }}>
          <div>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span>SEGMENT · AMBULATORY SURGERY CENTERS</span><span style={{ opacity: .5, display: isMobile ? 'none' : 'inline' }}>/</span><span>TAM $45.6B · 21% CAGR</span>
            </div>
            <h1 style={{ fontFamily: D.display, fontSize: 'clamp(42px, 9.5vw, 96px)', fontWeight: 400, lineHeight: 0.98, letterSpacing: 'clamp(-1.1px, -0.25vw, -2.4px)', margin: 0 }}>
              Procedure bundles,<br /><Grad>built for 6-OR centers.</Grad>
            </h1>
            <div style={{ fontSize: isMobile ? 16 : 17, lineHeight: 1.55, color: D.ink2, marginTop: 18, maxWidth: 560 }}>
              No MOQs. Same-day ship from Atlanta. A dedicated rep who answers the phone — not a call tree. We&apos;ll build a formulary for every procedure code you run.
            </div>
          </div>
          <div style={{ background: D.plum, color: D.paper, padding: isMobile ? 22 : 28, borderRadius: 14 }}>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.plumSoft }}>AVERAGE ASC CUSTOMER</div>
            <div style={{ fontFamily: D.display, fontSize: isMobile ? 42 : 56, letterSpacing: -1.2, marginTop: 12, lineHeight: 1 }}>$48,200<span style={{ fontSize: 16, opacity: .7 }}> /mo</span></div>
            <div style={{ fontSize: 13, color: D.plumSoft, marginTop: 6 }}>across 340 active SKUs</div>
            <div style={{ height: 1, background: 'rgba(255,255,255,.18)', margin: '22px 0' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 13 }}>
              {[['340', 'active SKUs'], ['4.1 days', 'avg reorder'], ['98.6%', 'fill rate'], ['0', 'min. MOQ']].map(([n, l], i) => (
                <div key={i}>
                  <div style={{ fontFamily: D.display, fontSize: 26, letterSpacing: -0.5 }}>{n}</div>
                  <div style={{ fontFamily: D.mono, fontSize: 10, color: D.plumSoft, letterSpacing: 1 }}>{l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: `${isMobile ? 56 : 72}px ${padX}px`, background: D.paperAlt, borderTop: `1px solid ${D.line}`, borderBottom: `1px solid ${D.line}` }}>
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'end', marginBottom: 28, flexDirection: isMobile ? 'column' : 'row', gap: 12 }}>
            <div>
              <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum }}>SHOP BY PROCEDURE</div>
              <h2 style={{ fontFamily: D.display, fontSize: 'clamp(34px, 5.6vw, 56px)', fontWeight: 400, letterSpacing: -1.2, margin: '12px 0 0', lineHeight: 1.02 }}>One cart per case.</h2>
            </div>
            <button onClick={() => navigate('/catalog')} style={{ background: 'transparent', border: `1.5px solid ${D.ink}`, padding: '12px 22px', borderRadius: 999, cursor: 'pointer', fontFamily: D.sans, fontSize: 14 }}>Build a custom bundle</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3,1fr)', gap: 14 }}>
            {[{ name: 'Total knee arthroplasty', cpt: '27447', items: 34, price: 1840, rep: 'Meredith C.' }, { name: 'Cataract extraction + IOL', cpt: '66984', items: 18, price: 612, rep: 'Terrell J.' }, { name: 'Colonoscopy with biopsy', cpt: '45380', items: 22, price: 438, rep: 'Meredith C.' }, { name: 'Shoulder arthroscopy', cpt: '29827', items: 28, price: 1450, rep: 'Aidan P.' }, { name: 'Carpal tunnel release', cpt: '64721', items: 14, price: 298, rep: 'Aidan P.' }, { name: 'Cardiac catheterization', cpt: '93458', items: 41, price: 2910, rep: 'Terrell J.' }].map((b, i) => (
              <div key={i} style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
                <PhotoPlaceholder caption={`OR tray · ${b.name}`} height={190} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} radius={0} />
                <div style={{ padding: 22 }}>
                  <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>CPT {b.cpt} · {b.items} SKUs</div>
                  <div style={{ fontFamily: D.display, fontSize: 26, letterSpacing: -0.5, marginTop: 10, lineHeight: 1.1 }}>{b.name}</div>
                  <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginTop: 18 }}>
                    <div>
                      <div style={{ fontFamily: D.display, fontSize: 28, color: D.plum, letterSpacing: -0.5 }}>${b.price.toLocaleString()}</div>
                      <div style={{ fontSize: 11, color: D.ink3, fontFamily: D.mono, letterSpacing: 0.6 }}>per case · rep {b.rep}</div>
                    </div>
                    <button style={{ background: D.ink, color: D.paper, border: 'none', padding: '10px 16px', borderRadius: 999, fontSize: 13, cursor: 'pointer' }}>Add to cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: `${isMobile ? 56 : 96}px ${padX}px`, background: D.paper }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: D.display, fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 400, letterSpacing: -1, lineHeight: 1.15, color: D.ink, fontStyle: 'italic' }}>
            "We switched from Medline because the MOQs weren't working for a 4-OR center. Unite had our first order on the dock in 48 hours."
          </div>
          <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: D.plum }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Sarah Chen</div>
              <div style={{ fontSize: 13, color: D.ink2 }}>Materials Director · Atlanta Surgical Center</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
