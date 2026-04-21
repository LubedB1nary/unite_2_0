import { D } from '../../tokens.js';
import { Nav } from '../../components/layout/Nav.jsx';
import { Footer } from '../../components/layout/Footer.jsx';
import { PageHead } from '../../components/layout/PageHead.jsx';
import { Grad } from '../../components/shared/Grad.jsx';
import { useViewport } from '../../lib/viewport.js';

export function SegmentPharmacy() {
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="SEGMENT · INDEPENDENT PHARMACIES · TAM $15-20B"
        title={<>Diversify <Grad>past the DIR fee</Grad>.</>}
        sub="Private-label diagnostics, DME supplies, and a telehealth integration via Clyne Health. The revenue channels the chains haven't figured out yet." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: `32px ${padX}px ${isMobile ? 56 : 80}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
          {[['OTC diagnostics', '35 SKUs private-labeled', '$8,420 avg monthly revenue'], ['DME dispensing', 'PDAC-approved orthotics', 'Bill Medicare direct'], ['Clyne telehealth', 'In-pharmacy consults', 'Rev-share on script fills']].map(([h, s, kpi], i) => (
            <div key={i} style={{ padding: isMobile ? 22 : 28, background: D.card, borderRadius: 14, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.display, fontSize: isMobile ? 26 : 32, letterSpacing: -0.6, lineHeight: 1.1 }}>{h}</div>
              <div style={{ fontSize: 14, color: D.ink2, marginTop: 10 }}>{s}</div>
              <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.plum, marginTop: 16 }}>{kpi.toUpperCase()}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: isMobile ? 24 : 40, background: D.paperAlt, borderRadius: 16, border: `1px solid ${D.line}` }}>
          <div style={{ fontFamily: D.display, fontSize: 'clamp(24px, 4.4vw, 40px)', letterSpacing: -0.8, lineHeight: 1.15, maxWidth: 800 }}>
            "Our front-of-store diagnostic counter now does $11K/mo. That's pure margin we didn't have a year ago."
          </div>
          <div style={{ marginTop: 20, fontSize: 13, color: D.ink2 }}>Marcus Williams · Williams Family Pharmacy · Kennesaw GA</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
