import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';
import { useViewport } from '../lib/viewport.js';
import { useSEO } from '../lib/seo.js';
import { IMG } from '../lib/imageMap.js';

export function ServiceDistribution() {
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  useSEO({
    title: 'Distribution — 4 DCs, 48-hour median ship, 94% ZIP coverage',
    description:
      'Atlanta · Reno · Dallas · Lithia Springs. Routed by proximity, picked within 2 hours of order, tracking returned to your portal automatically.',
    canonical: '/services/distribution',
  });
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="SERVICE · DISTRIBUTION"
        title={<>Your <em>forward</em> warehouse.</>}
        sub="Four DCs, three time zones, one routing engine. We stock to your rolling 30-day run rate, not last year's forecast." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: `32px ${padX}px ${isMobile ? 56 : 80}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
          {[['48 hr', 'Median ship'], ['94%', 'US ZIP coverage'], ['98.6%', 'Fill rate'], ['0 MOQ', 'Every SKU']].map(([b, s], i) => (
            <div key={i} style={{ padding: isMobile ? 18 : 24, background: D.card, borderRadius: 14, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.display, fontSize: isMobile ? 30 : 48, color: D.plum, letterSpacing: -0.8, lineHeight: 1 }}>{b}</div>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginTop: 10 }}>{s.toUpperCase()}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: isMobile ? 22 : 24 }}>
          <PhotoPlaceholder src={IMG.DIST_PICK_PATH} caption="warehouse · pick path" height={isMobile ? 240 : 520} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} />
          <div>
            <div style={{ fontFamily: D.display, fontSize: 'clamp(28px, 4.6vw, 40px)', letterSpacing: -0.8, lineHeight: 1.08 }}>How we ship to you.</div>
            {[
              'Order lands in WMS from web, EDI, or phone',
              'Routing engine picks nearest DC with full fill',
              'Pick + pack within 2 hrs if placed by 3pm ET',
              'ShipStation label, tracking returns to your portal',
              'QBO invoice auto-creates, net-30 clock starts',
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginTop: 18, paddingTop: 18, borderTop: `1px solid ${D.line}` }}>
                <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.plum, minWidth: 36 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontSize: 15, color: D.ink2, lineHeight: 1.5 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
