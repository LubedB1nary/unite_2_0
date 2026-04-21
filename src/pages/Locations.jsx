import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { useViewport } from '../lib/viewport.js';

const hubs = [
  { city: 'Atlanta, GA', type: 'HQ + main DC', skus: '12,400', sqft: '148,000', lat: 62, lng: 58 },
  { city: 'Lithia Springs, GA', type: 'Overflow + import', skus: '4,200', sqft: '62,000', lat: 61, lng: 56 },
  { city: 'Reno, NV', type: 'West DC', skus: '8,100', sqft: '88,000', lat: 52, lng: 18 },
  { city: 'Dallas, TX', type: 'South DC', skus: '6,400', sqft: '71,000', lat: 68, lng: 40 },
];

export function Locations() {
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="4 DOMESTIC WAREHOUSES · 3 COASTS"
        title={<>Close to <em>every</em> dock.</>}
        sub="Routed by proximity. 48-hr median delivery for 94% of US ZIP codes." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: `24px ${padX}px ${isMobile ? 56 : 64}px`, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 360px', gap: isMobile ? 18 : 28 }}>
        <div style={{ background: D.paperAlt, borderRadius: 16, border: `1px solid ${D.line}`, position: 'relative', overflow: 'hidden', minHeight: isMobile ? 320 : 520 }}>
          <div style={{ position: 'absolute', inset: 0, background: `
            radial-gradient(circle at 30% 40%, ${D.paper} 0%, transparent 40%),
            radial-gradient(circle at 70% 50%, ${D.paper} 0%, transparent 35%),
            repeating-linear-gradient(45deg, transparent 0 18px, rgba(94,41,99,0.04) 18px 19px)` }} />
          <div style={{ position: 'absolute', top: 24, left: 24, fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>COVERAGE · CONUS</div>
          {hubs.map((h, i) => (
            <div key={i} style={{ position: 'absolute', top: `${h.lat}%`, left: `${h.lng}%`, transform: 'translate(-50%,-50%)' }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: D.plum, boxShadow: `0 0 0 8px rgba(94,41,99,.14)` }} />
              <div style={{ position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)', background: D.ink, color: D.paper, fontSize: 11, padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>{h.city}</div>
            </div>
          ))}
          <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
            <path d="M 58 62 Q 40 20 18 52" fill="none" stroke={D.plum} strokeWidth="0.2" strokeDasharray="1,1" />
            <path d="M 58 62 Q 55 40 40 68" fill="none" stroke={D.plum} strokeWidth="0.2" strokeDasharray="1,1" />
            <path d="M 58 62 L 56 61" fill="none" stroke={D.plum} strokeWidth="0.2" />
          </svg>
        </div>
        <div>
          {hubs.map((h, i) => (
            <div key={i} style={{ padding: 18, background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, marginBottom: 10 }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>{h.type.toUpperCase()}</div>
              <div style={{ fontFamily: D.display, fontSize: 24, letterSpacing: -0.4, marginTop: 6 }}>{h.city}</div>
              <div style={{ display: 'flex', gap: 24, marginTop: 10, fontSize: 12, color: D.ink2 }}>
                <span>{h.skus} SKUs</span><span>{h.sqft} sqft</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
