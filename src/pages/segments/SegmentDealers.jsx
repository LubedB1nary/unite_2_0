import { D } from '../../tokens.js';
import { Nav } from '../../components/layout/Nav.jsx';
import { Footer } from '../../components/layout/Footer.jsx';
import { PageHead } from '../../components/layout/PageHead.jsx';
import { Grad } from '../../components/shared/Grad.jsx';
import { useViewport } from '../../lib/viewport.js';
import { useSEO } from '../../lib/seo.js';

export function SegmentDealers() {
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  useSEO({
    title: 'Regional Distributors — white-label, drop-ship, FDA-registered import',
    description:
      'Plug your catalog into our supply chain. White-label and private-label programs, EDI 850/855/856, transparent landed cost, FDA-registered import partner.',
    canonical: '/segments/distributors',
  });
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="SEGMENT · REGIONAL DISTRIBUTORS · TAM $10-15B"
        title={<>Your catalog, <em>our</em> import desk.</>}
        sub="FDA-registered import, HTS duty math, and drop-ship fulfillment. We'll private-label your top SKUs and carry the compliance risk." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: `32px ${padX}px ${isMobile ? 56 : 80}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 22 : 32 }}>
          <div>
            <div style={{ fontFamily: D.display, fontSize: 'clamp(30px, 5.4vw, 48px)', letterSpacing: -1, lineHeight: 1.08 }}>How dealers use us.</div>
            <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
              {[
                ['Drop-ship', 'We ship direct to your customer with your branded packing slip. You never touch inventory.'],
                ['Private label', 'Top 40 SKUs manufactured and labeled under your brand. 6-week MOQ-free runs.'],
                ['Import partner', 'We handle factory vetting, FDA validation, HTS duty math, Flexport freight.'],
                ['Overflow warehouse', 'Rent forward-deployed pallet positions at Atlanta, Reno, or Dallas.'],
              ].map(([h, s]) => (
                <div key={h} style={{ padding: isMobile ? 18 : 22, background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '140px 1fr', gap: isMobile ? 6 : 24 }}>
                  <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3, color: D.plum }}>{h}</div>
                  <div style={{ fontSize: 14, color: D.ink2, lineHeight: 1.55 }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ padding: isMobile ? 22 : 28, background: D.ink, color: D.paper, borderRadius: 16 }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plumSoft }}>APPLY · DEALER PROGRAM</div>
              <div style={{ fontFamily: D.display, fontSize: 36, letterSpacing: -0.7, lineHeight: 1.1, marginTop: 10 }}>Become a partner.</div>
              <div style={{ fontSize: 14, color: '#cfc4d2', marginTop: 14, lineHeight: 1.5 }}>Takes 10 minutes. Our dealer ops team replies the same day.</div>
              {['Company legal name', 'State of incorporation', 'Annual revenue', 'Product categories'].map((f) => (
                <div key={f} style={{ marginTop: 12 }}>
                  <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plumSoft }}>{f.toUpperCase()}</div>
                  <div style={{ marginTop: 4, padding: '10px 12px', background: 'rgba(255,255,255,.08)', borderRadius: 8, fontSize: 13, color: '#cfc4d2' }}>—</div>
                </div>
              ))}
              <button style={{ marginTop: 20, width: '100%', background: D.paper, color: D.ink, border: 'none', padding: 14, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Submit application</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
