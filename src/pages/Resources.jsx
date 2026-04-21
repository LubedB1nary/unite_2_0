import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { Icon } from '../components/shared/Icon.jsx';

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
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="RESOURCES · HCPCS REFERENCE"
        title={<>Every code, <Grad>every SKU</Grad>.</>}
        sub="Searchable HCPCS Level II reference cross-linked to our catalog. Current through the April 2026 CMS update." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '24px 40px 80px' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <div style={{ flex: 1, padding: '14px 18px', background: D.card, borderRadius: 999, border: `1px solid ${D.line}`, display: 'flex', alignItems: 'center', gap: 10, color: D.ink3 }}>
            <Icon.search /> Search 4,820 codes · L-codes, A-codes, E-codes, K-codes…
          </div>
          <button style={{ background: D.plum, color: D.paper, border: 'none', padding: '0 24px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>Download PDF</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 }}>
          <div>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginBottom: 12 }}>FAMILY</div>
            {[['L-codes · Orthotic', 1240], ['A-codes · Medical supplies', 820], ['E-codes · DME', 380], ['K-codes · DMEPOS', 290], ['V-codes · Vision', 180], ['T-codes · Tests', 420]].map(([n, c], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, background: i === 0 ? D.plum : 'transparent', color: i === 0 ? D.paper : D.ink2, fontSize: 13, cursor: 'pointer', marginBottom: 2 }}>
                <span>{n}</span><span style={{ fontFamily: D.mono, fontSize: 11, opacity: .7 }}>{c}</span>
              </div>
            ))}
          </div>
          <div style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
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
      <Footer />
    </div>
  );
}
