import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { useViewport } from '../lib/viewport.js';
import { useSEO } from '../lib/seo.js';

const services = [
  { name: 'Nationwide Distribution', sub: '48-hr median ship · 4 DCs · 94% ZIP coverage', cta: 'See coverage', path: '/services/distribution' },
  { name: 'PDAC Consulting', sub: 'Medicare billing code consulting for bracing + DME', cta: 'Book a review', path: '/services/pdac' },
  { name: 'Education & Certification', sub: 'Fitter training, coding CEUs, procedure bundles', cta: 'See schedule', path: '/services/education' },
  { name: 'Dealer Program', sub: 'White-label, drop-ship, FDA-registered import partner', cta: 'Apply to partner', path: '/services/dealer' },
  { name: 'Private Label', sub: 'Diagnostics + PPE manufactured under your brand', cta: 'Request samples', path: '/services/dealer' },
  { name: 'Government (Medava)', sub: 'MSPV BPA · Berry-compliant · Buy America Act', cta: 'Contract terms', path: '/segments/gov' },
];

export function Services() {
  const navigate = useNavigate();
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  useSEO({
    title: 'Services — distribution, PDAC consulting, dealer program, education',
    description:
      'Beyond the catalog: nationwide distribution, Medicare PDAC consulting, white-label dealer program, certification courses, government contracting via Medava.',
    canonical: '/services',
  });
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="SERVICES · BEYOND THE CATALOG"
        title={<>More than <Grad>a supplier</Grad>.</>}
        sub="A distribution platform, a consulting bench, and a manufacturing floor. The services we've built because our customers asked us to." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: `24px ${padX}px ${isMobile ? 56 : 80}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 14 }}>
          {services.map((s, i) => (
            <div key={i} style={{ background: D.card, borderRadius: 16, border: `1px solid ${D.line}`, padding: isMobile ? 22 : 32, display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 16 : 24, flexDirection: isMobile ? 'column' : 'row' }}>
              <div style={{ fontFamily: D.display, fontSize: isMobile ? 44 : 64, color: D.plum, letterSpacing: -1, minWidth: isMobile ? 0 : 80, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: D.display, fontSize: isMobile ? 24 : 30, letterSpacing: -0.6, lineHeight: 1.15 }}>{s.name}</div>
                <div style={{ fontSize: 14, color: D.ink2, marginTop: 8 }}>{s.sub}</div>
              </div>
              <button onClick={() => navigate(s.path)} style={{ background: 'transparent', color: D.ink, border: `1.5px solid ${D.ink}`, padding: '12px 20px', borderRadius: 999, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', alignSelf: isMobile ? 'stretch' : 'center', textAlign: 'center' }}>{s.cta} →</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
