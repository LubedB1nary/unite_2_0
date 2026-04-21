import { D } from '../../tokens.js';
import { AdminShell } from '../../components/layout/AdminShell.jsx';

const checks = [
  { name: 'openFDA device registration lookup', status: 'pass', detail: 'Owner/operator 9024871 · Shenzhen Medical Tech Co. · registered 2021, listings current' },
  { name: 'GS1 GTIN validation · top 20 SKUs', status: 'pass', detail: '20 / 20 valid GTIN-14 · company prefix 08921 confirmed' },
  { name: '510(k) clearance lookup', status: 'warn', detail: '3 of 12 devices lack 510(k) — classified exempt. Recommend clinical narrative.' },
  { name: 'Country of origin · TAA compliance', status: 'pass', detail: 'CN origin · acceptable for non-federal channels. Not Berry-compliant.' },
  { name: 'HTS code audit', status: 'pass', detail: '14 of 14 SKUs matched to HTS 9018.90 / 9022.14 · avg duty 0%' },
  { name: 'Quality certifications', status: 'pass', detail: 'ISO 13485 · CE 0123 · Letters on file' },
  { name: 'Insurance · product liability', status: 'fail', detail: 'Certificate not provided. Requested from vendor Apr 19.' },
];

const badge = (s) => ({ pass: ['#2d6a4f', 'PASS'], warn: [D.terra, 'REVIEW'], fail: ['#c3382d', 'FAIL'] })[s];

export function AdminVendorApproval() {
  return (
    <AdminShell active="vendors">
      <div style={{ padding: '40px 40px 24px', borderBottom: `1px solid ${D.line}` }}>
        <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 12 }}>VENDORS · APPROVAL REVIEW</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <div>
            <h1 style={{ fontFamily: D.display, fontSize: 52, fontWeight: 400, letterSpacing: -1.2, lineHeight: 1, margin: 0 }}>
              Shenzhen Medical Tech Co.
            </h1>
            <div style={{ fontSize: 14, color: D.ink2, marginTop: 10 }}>Application #V-2026-0412 · submitted Apr 18 · Partner tier request</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ background: 'transparent', color: '#c3382d', border: `1.5px solid #c3382d`, padding: '10px 18px', borderRadius: 999, fontSize: 13, cursor: 'pointer' }}>Reject</button>
            <button style={{ background: D.plum, color: D.paper, border: 'none', padding: '10px 22px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Approve as partner</button>
          </div>
        </div>
      </div>
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 18 }}>
            {[['5 / 7', 'Checks passed', D.plum], ['14', 'SKUs to onboard', D.plum], ['68%', 'Readiness score', D.terra]].map(([b, s, c], i) => (
              <div key={i} style={{ padding: 18, background: D.card, borderRadius: 10, border: `1px solid ${D.line}` }}>
                <div style={{ fontFamily: D.display, fontSize: 32, color: c, letterSpacing: -0.6, lineHeight: 1 }}>{b}</div>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginTop: 8 }}>{s.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <div style={{ background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
            <div style={{ padding: '16px 22px', borderBottom: `1px solid ${D.line}`, fontFamily: D.display, fontSize: 22, letterSpacing: -0.3 }}>Compliance checks · automated</div>
            {checks.map((c, i) => {
              const [color, label] = badge(c.status);
              return (
                <div key={i} style={{ padding: '16px 22px', borderTop: i === 0 ? 'none' : `1px solid ${D.line}`, display: 'grid', gridTemplateColumns: '1fr 90px', gap: 16, alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: 14, color: D.ink, fontWeight: 500 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: D.ink2, marginTop: 6, lineHeight: 1.5 }}>{c.detail}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, padding: '4px 10px', borderRadius: 999, background: `${color}20`, color }}>{label}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 20, background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, padding: 22 }}>
            <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3, marginBottom: 14 }}>Proposed SKU catalog · 14 items</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1, color: D.ink3 }}>
                  {['SKU', 'DESCRIPTION', 'GTIN', 'FDA', 'HTS', 'MARGIN'].map(h => <th key={h} style={{ padding: '8px 10px', textAlign: 'left' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ['SMT-10482', 'Pulse oximeter, finger', '0892100104823', '510(k)', '9018.19', '42%'],
                  ['SMT-22104', 'BP cuff, adult, Velcro', '0892100221047', 'Exempt', '9018.90', '38%'],
                  ['SMT-30421', 'Thermometer, infrared', '0892100304214', '510(k)', '9025.19', '46%'],
                  ['SMT-41829', 'Stethoscope, dual-head', '0892100418296', 'Exempt', '9018.90', '52%'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${D.line}` }}>
                    <td style={{ padding: '10px', fontFamily: D.mono, color: D.plum }}>{r[0]}</td>
                    <td style={{ padding: '10px' }}>{r[1]}</td>
                    <td style={{ padding: '10px', fontFamily: D.mono, color: D.ink2 }}>{r[2]}</td>
                    <td style={{ padding: '10px', color: D.ink2 }}>{r[3]}</td>
                    <td style={{ padding: '10px', fontFamily: D.mono, color: D.ink2 }}>{r[4]}</td>
                    <td style={{ padding: '10px', fontFamily: D.display, color: D.plum }}>{r[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <div style={{ padding: 22, background: D.plum, color: D.paper, borderRadius: 12 }}>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plumSoft }}>OPENFDA · DEVICE REGISTRATION</div>
            <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3, marginTop: 8, lineHeight: 1.2 }}>Registered & listings current</div>
            <div style={{ marginTop: 14, padding: 12, background: 'rgba(255,255,255,.1)', borderRadius: 8, fontFamily: D.mono, fontSize: 11, color: D.plumSoft, lineHeight: 1.6 }}>
              OWNER_OP: 9024871<br />REG_STATUS: Active<br />LISTINGS: 28 devices<br />LAST_SYNC: Apr 21 · 11:04 AM
            </div>
          </div>
          <div style={{ padding: 22, background: D.card, borderRadius: 12, border: `1px solid ${D.line}` }}>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>REP NOTES</div>
            <div style={{ fontSize: 13, color: D.ink2, marginTop: 10, lineHeight: 1.55 }}>Met with CEO at MDM&M 2026. Strong QMS. Packaging needs English-language secondary labels before we can drop-ship — factory committed to 30-day fix.</div>
            <div style={{ marginTop: 14, fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>MIGUEL VASQUEZ · APR 19</div>
          </div>
          <div style={{ padding: 22, background: D.card, borderRadius: 12, border: `1px solid ${D.line}` }}>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>DOCUMENTS</div>
            {['ISO 13485 certificate.pdf', 'CE 0123 declaration.pdf', '510(k) K223841.pdf', 'Packaging specs v3.pdf'].map((f, i) => (
              <div key={i} style={{ padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${D.line}`, fontSize: 13, color: D.ink2, display: 'flex', justifyContent: 'space-between' }}>
                <span>{f}</span><span style={{ fontFamily: D.mono, fontSize: 11, color: D.plum }}>↓</span>
              </div>
            ))}
            <div style={{ marginTop: 8, padding: 10, background: D.terraSoft, borderRadius: 8, fontSize: 12, color: D.terra }}>⚠ Missing: product liability insurance</div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
