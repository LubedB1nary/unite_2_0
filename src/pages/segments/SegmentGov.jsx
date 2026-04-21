import { D } from '../../tokens.js';
import { Nav } from '../../components/layout/Nav.jsx';
import { Footer } from '../../components/layout/Footer.jsx';
import { PageHead } from '../../components/layout/PageHead.jsx';
import { Grad } from '../../components/shared/Grad.jsx';

export function SegmentGov() {
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="SEGMENT · GOVERNMENT & VA · TAM $5-10B"
        title={<>Veteran-owned.<br /><Grad>Already on contract.</Grad></>}
        sub="MSPV BPA 36C24123A0077. CAGE 8MK70. Berry-compliant domestic PPE via Medava. We know how to bid, and we know how to deliver." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '32px 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 32 }}>
          {[['36C24123A0077', 'MSPV BPA'], ['VOSB', 'Veteran-owned'], ['Berry', 'Compliant PPE'], ['Buy America', 'Act eligible']].map(([b, s], i) => (
            <div key={i} style={{ padding: 22, background: D.card, borderRadius: 14, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.display, fontSize: 28, color: D.plum, letterSpacing: -0.5, lineHeight: 1 }}>{b}</div>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginTop: 10 }}>{s.toUpperCase()}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: D.display, fontSize: 44, letterSpacing: -0.9, lineHeight: 1.05 }}>Procurement mechanisms we support.</div>
            <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
              {[['MSPV-NG', 'Medical/Surgical Prime Vendor, Next Generation · VA-wide'], ['SAM.gov', 'Active registration. Ready to bid RFQs, IFBs, and RFPs.'], ['GSA Advantage', 'Catalog SKUs available via federal purchase card.'], ['Punch-out', 'cXML / OCI integration with VA procurement systems.'], ['Set-asides', 'SDVOSB and VOSB set-aside preferences honored.']].map(([h, s], i) => (
                <div key={i} style={{ padding: 18, background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, display: 'grid', gridTemplateColumns: '160px 1fr', gap: 20 }}>
                  <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.plum }}>{h.toUpperCase()}</div>
                  <div style={{ fontSize: 14, color: D.ink2 }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: 28, background: D.plum, color: D.paper, borderRadius: 16 }}>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plumSoft }}>GOVERNMENT SALES DESK</div>
            <div style={{ fontFamily: D.display, fontSize: 30, letterSpacing: -0.5, lineHeight: 1.1, marginTop: 10 }}>Need contract pricing or documentation?</div>
            <div style={{ marginTop: 20, fontSize: 13, color: D.plumSoft, lineHeight: 1.6 }}>Request TAA compliance docs, Berry Amendment letters, country of origin sheets, or MSPV contract pricing. Returned within one business day.</div>
            <button style={{ marginTop: 20, width: '100%', background: D.paper, color: D.plum, border: 'none', padding: 14, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>View contract pricing</button>
            <button style={{ marginTop: 8, width: '100%', background: 'transparent', color: D.paper, border: `1.5px solid ${D.paper}`, padding: 13, borderRadius: 999, fontSize: 14, cursor: 'pointer' }}>Contact government sales</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
