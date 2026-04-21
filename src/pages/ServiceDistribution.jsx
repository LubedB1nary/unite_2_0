import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';

export function ServiceDistribution() {
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="SERVICE · DISTRIBUTION"
        title={<>Your <em>forward</em> warehouse.</>}
        sub="Four DCs, three time zones, one routing engine. We stock to your rolling 30-day run rate, not last year's forecast." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '32px 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 32 }}>
          {[['48 hr', 'Median ship'], ['94%', 'US ZIP coverage'], ['98.6%', 'Fill rate'], ['0 MOQ', 'Every SKU']].map(([b, s], i) => (
            <div key={i} style={{ padding: 24, background: D.card, borderRadius: 14, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.display, fontSize: 48, color: D.plum, letterSpacing: -0.8, lineHeight: 1 }}>{b}</div>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginTop: 10 }}>{s.toUpperCase()}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
          <PhotoPlaceholder caption="warehouse · pick path" height={520} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} />
          <div>
            <div style={{ fontFamily: D.display, fontSize: 40, letterSpacing: -0.8, lineHeight: 1.05 }}>How we ship to you.</div>
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
