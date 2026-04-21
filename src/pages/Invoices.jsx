import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';

const rows = [
  ['UM-284712', 'Apr 21, 2026', '$4,284.50', 'Net-30', 'May 21', 'Unpaid', true],
  ['UM-283640', 'Apr 14, 2026', '$1,940.20', 'Net-30', 'May 14', 'Unpaid', true],
  ['UM-282108', 'Apr 02, 2026', '$3,120.80', 'Net-30', 'May 02', 'Paid'],
  ['UM-281004', 'Mar 24, 2026', '$2,480.00', 'Net-30', 'Apr 24', 'Paid'],
  ['UM-279847', 'Mar 12, 2026', '$860.15', 'Net-30', 'Apr 12', 'Paid'],
  ['UM-278220', 'Feb 28, 2026', '$5,810.90', 'Net-30', 'Mar 30', 'Paid'],
  ['UM-277120', 'Feb 18, 2026', '$1,240.00', 'Net-30', 'Mar 20', 'Paid'],
  ['UM-276004', 'Feb 08, 2026', '$980.50', 'Net-30', 'Mar 10', 'Paid'],
];

export function Invoices() {
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="ACCOUNT · INVOICES" title="Invoices & billing" sub="Pay outstanding balances, download statements, and export to your AP system." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '24px 40px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
          {[['$6,224.70', 'Current AR'], ['$0.00', 'Past due'], ['$48,420', 'YTD spend'], ['14 days', 'Avg DPO']].map(([b, s], i) => (
            <div key={i} style={{ padding: 24, background: D.card, borderRadius: 14, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.display, fontSize: 40, color: i === 1 ? D.ink3 : D.plum, letterSpacing: -0.8, lineHeight: 1 }}>{b}</div>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginTop: 10 }}>{s.toUpperCase()}</div>
            </div>
          ))}
        </div>
        <div style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${D.line}` }}>
            <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3 }}>Invoice history</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ background: 'transparent', color: D.ink2, border: `1px solid ${D.line}`, padding: '8px 14px', borderRadius: 999, fontSize: 12, cursor: 'pointer' }}>Export CSV</button>
              <button style={{ background: D.plum, color: D.paper, border: 'none', padding: '8px 16px', borderRadius: 999, fontSize: 12, cursor: 'pointer' }}>Pay all outstanding</button>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: D.paperAlt, fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>
                {['INVOICE #', 'DATE', 'AMOUNT', 'TERMS', 'DUE', 'STATUS', ''].map((h) => <th key={h} style={{ padding: '12px 18px', textAlign: 'left' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${D.line}` }}>
                  <td style={{ padding: '14px 18px', fontFamily: D.mono, color: D.plum, fontWeight: 600 }}>{r[0]}</td>
                  <td style={{ padding: '14px 18px' }}>{r[1]}</td>
                  <td style={{ padding: '14px 18px', fontFamily: D.mono }}>{r[2]}</td>
                  <td style={{ padding: '14px 18px', color: D.ink2 }}>{r[3]}</td>
                  <td style={{ padding: '14px 18px', color: D.ink2 }}>{r[4]}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, padding: '4px 10px', borderRadius: 999, background: r[5] === 'Paid' ? 'rgba(94,41,99,.1)' : r[6] ? D.terraSoft : 'rgba(94,41,99,.12)', color: r[5] === 'Paid' ? D.ink2 : D.terra }}>{r[5].toUpperCase()}</span>
                  </td>
                  <td style={{ padding: '14px 18px', fontFamily: D.mono, fontSize: 11, color: D.plum, textAlign: 'right' }}>PDF →</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
