import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Icon } from '../components/shared/Icon.jsx';

export function Dashboard() {
  const navigate = useNavigate();
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <div style={{ padding: '56px 40px 28px', background: D.paper }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, alignItems: 'end' }}>
          <div>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum }}>ATLANTA SURGICAL CENTER · NET 30</div>
            <h1 style={{ fontFamily: D.display, fontSize: 88, fontWeight: 400, letterSpacing: -2.2, margin: '12px 0 0', lineHeight: 0.98 }}>
              Welcome back, <em>Sarah</em>.
            </h1>
            <div style={{ fontSize: 16, color: D.ink2, marginTop: 16 }}>Your dedicated rep <span style={{ color: D.ink, fontWeight: 600 }}>Meredith Cole</span> is online · replies in 11 min avg.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'end' }}>
            <button onClick={() => navigate('/catalog')} style={{ background: D.plum, color: D.paper, border: 'none', padding: '12px 20px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>Quick reorder</button>
            <button style={{ background: 'transparent', color: D.ink, border: `1.5px solid ${D.ink}`, padding: '12px 20px', borderRadius: 999, cursor: 'pointer', fontSize: 14 }}>Message rep</button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '24px 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
          {[
            ['$48,210', 'This month spend', 'vs $41,890 last', true],
            ['12', 'Active orders', '3 out for delivery'],
            ['340', 'SKUs in formulary', '12 low-stock alerts'],
            ['Net 30', 'Payment terms', '$12,450 outstanding'],
          ].map(([big, small, sub, up], i) => (
            <div key={i} style={{ padding: 20, background: D.card, borderRadius: 14, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>{small.toUpperCase()}</div>
              <div style={{ fontFamily: D.display, fontSize: 36, color: D.ink, letterSpacing: -0.7, marginTop: 8 }}>{big}</div>
              <div style={{ fontSize: 12, color: up ? '#3b8760' : D.ink2, marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18 }}>
          <div style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px', borderBottom: `1px solid ${D.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: D.display, fontSize: 22 }}>Recent orders</div>
              <div style={{ fontFamily: D.mono, fontSize: 11, color: D.ink3, cursor: 'pointer' }} onClick={() => navigate('/account/invoices')}>VIEW ALL</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: D.paperAlt, fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>
                  {['ORDER', 'DATE', 'ITEMS', 'TOTAL', 'STATUS'].map((h) => <th key={h} style={{ padding: '12px 16px', textAlign: 'left' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ['#UM-2026-04812', 'Apr 18', '8', '$1,284', 'Delivered', '#3b8760'],
                  ['#UM-2026-04796', 'Apr 16', '14', '$3,540', 'In transit', D.plum],
                  ['#UM-2026-04751', 'Apr 12', '22', '$8,910', 'Delivered', '#3b8760'],
                  ['#UM-2026-04720', 'Apr 08', '6', '$612', 'Delivered', '#3b8760'],
                  ['#UM-2026-04689', 'Apr 04', '31', '$12,420', 'Delivered', '#3b8760'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${D.line}` }}>
                    <td style={{ padding: '14px 16px', fontFamily: D.mono, fontSize: 12 }}>{r[0]}</td>
                    <td style={{ padding: '14px 16px', color: D.ink2 }}>{r[1]}</td>
                    <td style={{ padding: '14px 16px' }}>{r[2]}</td>
                    <td style={{ padding: '14px 16px', fontFamily: D.display, fontSize: 16, color: D.plum }}>{r[3]}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: r[5] }}><Icon.dot /> {r[4]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ background: D.plum, color: D.paper, borderRadius: 14, padding: 22 }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plumSoft }}>YOUR REP</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 24, background: D.plumSoft }} />
                <div>
                  <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3 }}>Meredith Cole</div>
                  <div style={{ fontSize: 12, color: D.plumSoft }}>Southeast · ASC specialist</div>
                </div>
              </div>
              <div style={{ marginTop: 16, fontSize: 13, color: D.plumSoft, lineHeight: 1.5 }}>"Sarah — circling back on the shoulder arthroscopy tray build-out. I've got the 3M supplies in Atlanta for Wednesday."</div>
              <button style={{ marginTop: 14, width: '100%', background: D.paper, color: D.plum, border: 'none', padding: 12, borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Reply · book a call</button>
            </div>
            <div style={{ background: D.card, borderRadius: 14, padding: 22, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>SAVED LISTS</div>
              {[['Total knee tray', '34 SKUs'], ['Shoulder arthroscopy', '28 SKUs'], ['Weekly PPE reup', '8 SKUs'], ['OR daily consumables', '17 SKUs']].map(([n, c], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: i === 0 ? 'none' : `1px solid ${D.line}` }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{n}</div>
                    <div style={{ fontSize: 11, fontFamily: D.mono, color: D.ink3, marginTop: 2 }}>{c}</div>
                  </div>
                  <button onClick={() => navigate('/catalog')} style={{ background: D.ink, color: D.paper, border: 'none', width: 32, height: 32, borderRadius: 16, cursor: 'pointer' }}><Icon.arrow /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
