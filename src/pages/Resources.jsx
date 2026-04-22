import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { useViewport } from '../lib/viewport.js';
import { useSEO } from '../lib/seo.js';

const codes = [
  ['L1832', 'Knee orthosis, adjustable knee joints, positional orthosis', 'Orthotics', 48],
  ['L4361', 'Walking boot, pneumatic, prefabricated', 'Orthotics', 12],
  ['A4927', 'Gloves, non-sterile, per 100', 'PPE', 180],
  ['A6234', 'Hydrocolloid dressing, ≥ 16 sq in', 'Wound care', 22],
  ['E0445', 'Oximeter device for measuring blood oxygen', 'DME', 8],
  ['L3809', 'WHFO, without joints, custom fabricated', 'Orthotics', 14],
  ['A4649', 'Surgical supply, miscellaneous', 'Supplies', 340],
  ['L1845', 'KO, double upright, custom fabricated', 'Orthotics', 9],
];

export function Resources() {
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  useSEO({
    title: 'Resources — HCPCS reference for medical supplies',
    description:
      'Searchable HCPCS Level II reference cross-linked to Unite Medical SKUs. Current through the latest CMS update.',
    canonical: '/resources',
  });
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="RESOURCES · HCPCS REFERENCE"
        title={<>Every code, <Grad>every SKU</Grad>.</>}
        sub="Searchable HCPCS Level II reference cross-linked to our catalog. Current through the April 2026 CMS update." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: `24px ${padX}px ${isMobile ? 56 : 80}px` }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 240px', padding: '14px 18px', background: D.card, borderRadius: 999, border: `1px solid ${D.line}`, display: 'flex', alignItems: 'center', gap: 10, color: D.ink3, fontSize: isMobile ? 13 : 14 }}>
            <Icon.search /> Search 4,820 codes
          </div>
          <button style={{ background: D.plum, color: D.paper, border: 'none', padding: isMobile ? '12px 22px' : '0 24px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>Download PDF</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 18 : 32 }}>
          <div>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginBottom: 12 }}>FAMILY</div>
            <div className={isMobile ? 'um-scroll-x' : ''} style={isMobile ? { display: 'flex', gap: 6 } : undefined}>
              {[['L-codes · Orthotic', 1240], ['A-codes · Medical supplies', 820], ['E-codes · DME', 380], ['K-codes · DMEPOS', 290], ['V-codes · Vision', 180], ['T-codes · Tests', 420]].map(([n, c], i) => (
                <div key={n} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: isMobile ? 999 : 8, background: i === 0 ? D.plum : (isMobile ? D.card : 'transparent'), color: i === 0 ? D.paper : D.ink2, fontSize: 13, cursor: 'pointer', marginBottom: isMobile ? 0 : 2, gap: 8, border: isMobile ? `1px solid ${i === 0 ? D.plum : D.line}` : 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  <span>{n}</span><span style={{ fontFamily: D.mono, fontSize: 11, opacity: .7 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
            <div className={isMobile ? 'um-scroll-x' : ''}>
            <table style={{ width: '100%', minWidth: isMobile ? 600 : 'auto', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: D.paperAlt, fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>
                  {['CODE', 'DESCRIPTION', 'CATEGORY', 'SKUS', 'ACTION'].map((h) => <th key={h} style={{ padding: '12px 18px', textAlign: 'left' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {codes.map((r, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${D.line}` }}>
                    <td style={{ padding: '14px 18px', fontFamily: D.mono, color: D.plum, fontWeight: 600 }}>{r[0]}</td>
                    <td style={{ padding: '14px 18px' }}>{r[1]}</td>
                    <td style={{ padding: '14px 18px', color: D.ink2 }}>{r[2]}</td>
                    <td style={{ padding: '14px 18px', fontFamily: D.mono }}>{r[3]}</td>
                    <td style={{ padding: '14px 18px', fontFamily: D.mono, fontSize: 11, color: D.plum, letterSpacing: 0.8 }}>VIEW SKUS →</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
