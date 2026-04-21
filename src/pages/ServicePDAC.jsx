import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { useViewport } from '../lib/viewport.js';
import { IMG } from '../lib/imageMap.js';

export function ServicePDAC() {
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="SERVICE · PDAC CONSULTING"
        title={<>Get your <Grad>L-codes</Grad> right the first time.</>}
        sub="PDAC approval isn't a formality — it's the difference between getting paid and eating the cost. We've done 180+ submissions; we know the patterns." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: `32px ${padX}px ${isMobile ? 56 : 80}px`, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 22 : 32 }}>
        <div style={{ background: D.card, borderRadius: 16, border: `1px solid ${D.line}`, padding: isMobile ? 22 : 32 }}>
          <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>WHAT'S INCLUDED</div>
          <div style={{ fontFamily: D.display, fontSize: 36, letterSpacing: -0.7, lineHeight: 1.1, marginTop: 10 }}>A 3-phase engagement.</div>
          {[
            ['Audit', 'Review of current L-code assignments; flag mis-coded SKUs; estimate claim denial risk.'],
            ['Submission', 'We prepare the full PDAC application package: photos, specs, clinical narrative, coding rationale.'],
            ['Appeal', 'For denials: rebuttal letter, code revision, resubmit. 84% first-appeal success.'],
          ].map(([h, s], i) => (
            <div key={i} style={{ padding: '20px 0', borderTop: `1px solid ${D.line}`, marginTop: i === 0 ? 20 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: 14 }}>
                <div style={{ fontFamily: D.display, fontSize: 44, color: D.plum, letterSpacing: -0.8, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3 }}>{h}</div>
                  <div style={{ fontSize: 14, color: D.ink2, marginTop: 6, lineHeight: 1.55 }}>{s}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <PhotoPlaceholder src={IMG.PDAC_LETTER} caption="PDAC letter, marked up" height={isMobile ? 200 : 380} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} />
          <div style={{ marginTop: 18, padding: isMobile ? 22 : 28, background: D.plum, color: D.paper, borderRadius: 16 }}>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plumSoft }}>ENGAGEMENT FEE · FLAT</div>
            <div style={{ fontFamily: D.display, fontSize: isMobile ? 52 : 72, letterSpacing: -1.6, marginTop: 10, lineHeight: 1 }}>$2,400</div>
            <div style={{ fontSize: 13, color: D.plumSoft, marginTop: 6 }}>per L-code · all phases · success-fee rebate on denied</div>
            <button style={{ marginTop: 20, width: '100%', background: D.paper, color: D.plum, border: 'none', padding: 14, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Book a review</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
