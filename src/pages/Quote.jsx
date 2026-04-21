import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { Grad } from '../components/shared/Grad.jsx';

const rows = [
  { name: 'Compression stockings 20-30mmHg', fob: 2.40, moq: 5000, hts: '6115.10', duty: 14.6 },
  { name: 'Thermometer probes, disposable', fob: 0.08, moq: 25000, hts: '9025.19', duty: 0 },
  { name: 'Cold/hot therapy gel pack 6×10', fob: 0.94, moq: 2000, hts: '3824.99', duty: 5 },
  { name: 'N95 respirator, fluid-resistant', fob: 0.21, moq: 50000, hts: '6307.90', duty: 7 },
];

export function Quote() {
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <div style={{ background: D.paperAlt, borderBottom: `1px solid ${D.line}` }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '56px 40px' }}>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 14 }}>QUOTING ENGINE · CORE IP</div>
          <h1 style={{ fontFamily: D.display, fontSize: 76, fontWeight: 400, letterSpacing: -1.8, margin: 0, lineHeight: 0.98 }}>
            Vendor spreadsheet in.<br /><Grad>Customer PDF out.</Grad> Fourteen seconds.
          </h1>
          <div style={{ color: D.ink2, maxWidth: 640, fontSize: 16, lineHeight: 1.55, marginTop: 20 }}>
            Upload a foreign-vendor product sheet. We validate every FDA code, pull today's USITC duty rate, call Flexport for ocean freight, and land it on your customer's desk as a PDF — before your coffee cools.
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '44px 40px 80px', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 36 }}>
        <div>
          <div style={{ background: D.card, borderRadius: 14, padding: 24, border: `1px solid ${D.line}`, display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: D.plum, color: D.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.upload /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>product-sheet-q2-2026.xlsx</div>
              <div style={{ fontSize: 13, color: D.ink2, marginTop: 2 }}>Shanghai MedTech Co. · 4 line items parsed · 1.8s</div>
            </div>
            <div style={{ fontFamily: D.mono, fontSize: 11, color: '#3b8760' }}><Icon.check /> VALIDATED</div>
          </div>
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {[['openFDA', '4/4 cleared', Icon.shield], ['USITC HTS', 'Avg 6.7%', Icon.factory], ['Flexport', '$412 LCL', Icon.ship], ['Claude', '180w letter', Icon.sparkle]].map(([n, v, I], i) => (
              <div key={i} style={{ background: D.card, borderRadius: 12, padding: 16, border: `1px solid ${D.line}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: D.paperAlt, color: D.plum, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I /></div>
                  <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 0.8, color: D.ink3 }}>{n.toUpperCase()}</div>
                </div>
                <div style={{ fontFamily: D.display, fontSize: 22, color: D.ink, marginTop: 10, letterSpacing: -0.4 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: D.card, borderRadius: 14, overflow: 'hidden', border: `1px solid ${D.line}` }}>
            <div style={{ padding: '18px 22px', borderBottom: `1px solid ${D.line}`, display: 'flex', alignItems: 'center' }}>
              <div style={{ fontFamily: D.display, fontSize: 22 }}>Landed cost breakdown</div>
              <div style={{ flex: 1 }} />
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>60% MARGIN ENFORCED</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: D.paperAlt, color: D.ink3, fontFamily: D.mono, fontSize: 10, letterSpacing: 1 }}>
                  {['PRODUCT', 'HTS', 'FOB', 'DUTY', 'LANDED', 'SELL'].map((h) => <th key={h} style={{ padding: '12px 16px', textAlign: 'left' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const landed = r.fob * (1 + r.duty / 100) + 0.42;
                  const sell = landed * 2.5;
                  return (
                    <tr key={i} style={{ borderTop: `1px solid ${D.line}` }}>
                      <td style={{ padding: 16, fontWeight: 500 }}>{r.name}</td>
                      <td style={{ padding: 16, fontFamily: D.mono, fontSize: 11 }}>{r.hts}</td>
                      <td style={{ padding: 16, fontFamily: D.mono }}>${r.fob.toFixed(2)}</td>
                      <td style={{ padding: 16, fontFamily: D.mono }}>{r.duty}%</td>
                      <td style={{ padding: 16, fontFamily: D.mono, color: D.plum }}>${landed.toFixed(2)}</td>
                      <td style={{ padding: 16, fontFamily: D.mono, fontWeight: 600 }}>${sell.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div style={{ position: 'sticky', top: 120 }}>
            <div style={{ background: D.plum, color: D.paper, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.plumSoft }}>QUOTE Q-26-00284</div>
              <div style={{ fontFamily: D.display, fontSize: 64, letterSpacing: -1.8, marginTop: 14, lineHeight: 1 }}>$34,612</div>
              <div style={{ fontSize: 13, color: D.plumSoft, marginTop: 8 }}>Landed · delivered · net 30 · FOB Atlanta</div>
              <div style={{ height: 1, background: 'rgba(255,255,255,.18)', margin: '22px 0' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 12 }}>
                <div><div style={{ color: D.plumSoft, fontFamily: D.mono }}>CUSTOMER</div><div style={{ marginTop: 4 }}>Atlanta Surgical<br />Mariah Patel</div></div>
                <div><div style={{ color: D.plumSoft, fontFamily: D.mono }}>DELIVERS</div><div style={{ marginTop: 4 }}>June 12, 2026<br />MSC Vela 2E</div></div>
              </div>
              <button style={{ marginTop: 22, width: '100%', background: D.paper, color: D.plum, border: 'none', padding: 14, borderRadius: 999, fontSize: 14, fontWeight: 600, fontFamily: D.sans, cursor: 'pointer' }}>Send PDF to customer</button>
            </div>
            <div style={{ marginTop: 14, padding: 20, background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, fontSize: 13, color: D.ink2, lineHeight: 1.6 }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum, marginBottom: 10 }}>AI COVER LETTER · DRAFT</div>
              "Mariah — per our call last Tuesday, here's pricing on the four SKUs we discussed for the Q3 build-out…"
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
